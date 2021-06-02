import { action, computed, IObservableArray, isObservableMap, makeObservable, observable } from "mobx";
import { ownKeys } from "../core/utils";
import { GroupOptions } from "../decorators";
import { Disposable } from "./disposable";
import { FieldProperty } from "./fieldProperty";
import { Tree } from "./tree";

export class GroupProperty extends Disposable {
    readonly tree: Tree<any>;
    readonly parent?: FieldProperty | GroupProperty;
    @observable readonly children: IObservableArray<FieldProperty | GroupProperty>;
    @observable readonly decorators: Map<PropertyKey, GroupOptions>;

    readonly id: string;
    readonly type: symbol;

    @computed
    get name() {
        return this.id;
    }

    @computed
    get parentField() {
        let walk = this.parent;
        while (walk instanceof GroupProperty) walk = walk?.parent;
        return walk!;
    }

    constructor(tree: Tree<any>, parent: FieldProperty | GroupProperty, groupType: symbol, groupId: string) {
        super();
        this.tree = tree;
        this.parent = parent;
        this.children = [] as any;
        this.decorators = new Map();

        this.id = groupId;
        this.type = groupType;

        makeObservable(this);

        this.initProperties();
        this.initDecorators();
    }

    @action
    private initDecorators() {
        this.decorators.clear();
        const arr: [PropertyKey, GroupOptions][] = [];
        for (let prop of this.children) {
            if (prop instanceof FieldProperty) {
                arr.push([prop.path!, prop.decorators.get(this.type) as GroupOptions]);
            }
        }

        if (isObservableMap(this.decorators)) this.decorators.replace(arr);
    }

    @action
    private initProperties() {
        this.children.clear();
        const groupIds: string[] = [];
        for (let key of ownKeys(this.parentField.value)) {
            if (typeof key === "number") throw new Error("Report to dev how you get this error");

            const group = Reflect.getMetadata(this.type, this.parentField.value, key) as GroupOptions;
            if (!group || !group.groupId.startsWith(this.id)) continue;

            if (group.groupId === this.id) {
                this.children.push(new FieldProperty(this.tree, this, key));
            } else {
                if (!groupIds.includes(group.groupId)) {
                    this.children.push(new GroupProperty(this.tree, this, this.type, group.groupId));
                    groupIds.push(group.groupId);
                }
            }
        }
    }

    @computed
    get order() {
        const orders: number[] = [];
        for (let opt of this.decorators.values()) orders.push(opt.order || 0);
        return Math.max(...orders);
    }

    @computed
    get members() {
        var arr: FieldProperty[] = [];
        function walk(prop: FieldProperty | GroupProperty) {
            if (prop instanceof FieldProperty) arr.push(prop);
            else arr.push(...prop.members);
        }
        this.children.forEach(walk);
        return arr;
    }

    @computed
    get groups(): FieldProperty[] {
        return this.children.filter((c) => c instanceof FieldProperty) as any;
    }

    dispose() {
        super.dispose();
        for (let child of this.children) {
            child.dispose();
        }
    }
}
