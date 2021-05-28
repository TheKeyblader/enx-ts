import {
    action,
    computed,
    get,
    IArrayDidChange,
    IObjectDidChange,
    IObservableArray,
    isObservableArray,
    isObservableMap,
    isObservableObject,
    isObservableSet,
    Lambda,
    makeObservable,
    observable,
    observe,
    reaction,
} from "mobx";
import { ownKeys } from "../core/utils";
import { $order, getGroupMetadata, OrderOptions } from "../decorators";
import { Disposable } from "./disposable";
import { GroupProperty } from "./groupProperty";
import { Tree } from "./tree";

enum ObjectType {
    object,
    set,
    map,
    array,
    value,
}

function getObjectType(obj: any): ObjectType {
    if (isObservableArray(obj)) return ObjectType.array;
    else if (isObservableMap(obj)) return ObjectType.map;
    else if (isObservableSet(obj)) return ObjectType.set;
    else if (isObservableObject(obj)) return ObjectType.object;
    else return ObjectType.value;
}

export class FieldProperty<T = any> extends Disposable {
    readonly tree: Tree<any>;
    readonly parent?: FieldProperty | GroupProperty;
    readonly path?: PropertyKey;
    @observable readonly children: IObservableArray<FieldProperty | GroupProperty>;
    @observable readonly decorators: Map<symbol, {}>;

    observeDisposer?: Lambda;

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
        this.buildInitialProperties();

        this.addDisposer(
            reaction(() => getObjectType(this.value), this.startObserve.bind(this), { fireImmediately: true })
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
    private buildInitialProperties() {
        this.children.clear();
        if (isObservableObject(this.value)) {
            const groupIds: string[] = [];
            for (let key of ownKeys(this.value as any)) {
                const group = getGroupMetadata(this.value as any, key);
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
        } else if (isObservableArray(this.value)) {
            this.value.map((v, index) => {
                this.children.push(new FieldProperty(this.tree, this, index));
            });
        }
    }

    //#region Observe
    private startObserve(type: ObjectType) {
        this.observeDisposer?.();
        switch (type) {
            case ObjectType.object:
                this.observeDisposer = observe(this.value, this.observeObject.bind(this));
                break;
            case ObjectType.array:
                this.observeDisposer = reaction(() => (this.value as any).length, this.observeArray.bind(this), {
                    name: "ObserveArrayReaction",
                });
                break;
            case ObjectType.value:
                break;
            default:
                throw new Error("Object of type " + ObjectType[type] + " are not supported");
        }
    }

    private observeObject(change: IObjectDidChange) {
        if (change.type == "add") {
            this.children.push(new FieldProperty(this.tree, this, change.name));
        } else if (change.type == "remove") {
            var prop = this.members.find((p) => p.path == change.name);
            if (!prop) throw new Error("Couldn't found property to remove");
            var parent = prop.parent!;
            parent.children.remove(prop);
        }
    }

    @action("ObserveArrayAction")
    private observeArray(length: number, oldLength: number) {
        if (length > oldLength) {
            for (let i = 0; i < length - oldLength; i++) {
                this.children.push(new FieldProperty(this.tree, this, oldLength + i));
            }
        } else {
            for (let i = 0; i < oldLength - length; i++) {
                var prop = this.children.pop();
                prop?.dispose();
            }
        }
    }
    //#endregion

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

    dispose() {
        super.dispose();
        this.observeDisposer?.();
        for (let child of this.children) {
            child.dispose();
        }
    }
}
