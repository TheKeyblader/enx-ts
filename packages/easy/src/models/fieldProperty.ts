import {
    action,
    computed,
    get,
    IObservableArray,
    isObservableMap,
    isObservableObject,
    makeObservable,
    observable,
    reaction,
} from "mobx";
import { ownKeys } from "../core/utils";
import { $order, getGroupMetadata, OrderOptions } from "../decorators";
import { Disposable } from "./disposable";
import { GroupProperty } from "./groupProperty";
import { Tree } from "./tree";

export class FieldProperty<T = any> extends Disposable {
    readonly tree: Tree<any>;
    readonly parent?: FieldProperty | GroupProperty;
    readonly path?: PropertyKey;
    @observable readonly children: IObservableArray<FieldProperty | GroupProperty>;
    @observable readonly decorators: Map<symbol, {}>;

    get id() {
        return this.path?.toString() || "";
    }

    @computed
    get parentField() {
        let walk = this.parent;
        while (walk instanceof GroupProperty) walk = walk?.parent;
        return walk;
    }

    constructor(tree: Tree<any>, parent?: FieldProperty | GroupProperty, path?: PropertyKey) {
        super();
        this.tree = tree;
        this.parent = parent;
        this.path = path;

        this.children = [] as any;
        this.decorators = new Map();

        makeObservable(this);

        this.initDecorators();
        this.addDisposer(
            reaction(
                () => this.value,
                (v) => this.buildProperties(v),
                { fireImmediately: true }
            )
        );
    }

    @action
    private initDecorators() {
        this.decorators.clear();
        if (typeof this.path === "number") return;

        let arr: [symbol, {}][];
        if (this.path) {
            arr = Reflect.getMetadataKeys(this.parentField!.value, this.path).map((c) => [
                c as symbol,
                Reflect.getMetadata(c, this.parentField!.value, this.path as any) as {},
            ]);
        } else {
            arr = Reflect.getMetadataKeys(this.value).map((c) => [
                c as symbol,
                Reflect.getMetadata(c, this.value) as {},
            ]);
        }

        if (isObservableObject(this.value)) {
            var prototype = Object.getPrototypeOf(this.value);
            arr = arr.concat(
                //@ts-ignore
                Reflect.getMetadataKeys(prototype.constructor).map((c) => [
                    c as symbol,
                    //@ts-ignore
                    Reflect.getMetadata(c, prototype.constructor) as {},
                ])
            );
        }

        if (isObservableMap(this.decorators)) this.decorators.replace(arr);
    }

    @action
    private buildProperties(value: T) {
        this.children.clear();
        if (isObservableObject(value)) {
            const groupIds: string[] = [];
            for (let key of ownKeys(value as any)) {
                const group = getGroupMetadata(value as any, key);
                if (!group) this.children.push(new FieldProperty(this.tree, this, key));
                else {
                    const groupId = group[1].groupId.split("/")[0];
                    const id = group[0].toString() + "-" + groupId;
                    if (!groupIds.includes(id)) {
                        this.children.push(new GroupProperty(this.tree, this, group[0], groupId));
                        groupIds.push(id);
                    }
                }
            }
        }
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
    get fields(): FieldProperty[] {
        return this.children.filter((p) => p instanceof FieldProperty) as any;
    }

    @computed
    get groups(): GroupProperty[] {
        return this.children.filter((p) => p instanceof GroupProperty) as any;
    }

    @computed
    get order() {
        const order = this.decorators.get($order) as OrderOptions;
        if (order) return order.order;
        return 0;
    }

    @computed
    get value(): T {
        if (!this.parentField) return this.tree.instance;
        return get(this.parentField.value, this.path!)!;
    }
}
