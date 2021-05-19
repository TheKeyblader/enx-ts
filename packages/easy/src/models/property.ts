import { computed, get, IReactionDisposer, reaction } from "mobx";
import { model, Model, prop, findParent, applySet, isModel, modelAction, AnyModel, getRootStore } from "mobx-keystone";
import { ownKeys } from "../core/utils";
import { getGroupMetadata, GroupOptions } from "../decorators/group";
import { $order, OrderOptions } from "../decorators/order";
import type { Tree } from "./tree";

export enum PropertyType {
    Value,
    Group,
}

@model("EnxEasy/Property")
export class Property<T = any> extends Model({
    name: prop<string>(),
    path: prop<PropertyKey>(),
    children: prop<(Property | PropertyGroup)[]>(() => []),
}) {
    private inited = false;
    private propertiesDisposer?: IReactionDisposer;
    private root!: Tree;
    private parent!: Property;

    get tree() {
        return this.root;
    }

    get parentProperty() {
        return this.parent;
    }

    @computed
    get decorators(): Map<symbol, {}> {
        if (typeof this.path === "number") return new Map();

        let arr: [symbol, {}][];
        if (this.path != "") {
            arr = Reflect.getMetadataKeys(this.parentProperty.value, this.path).map((c) => [
                c as symbol,
                Reflect.getMetadata(c, this.parentProperty.value, this.path as any) as {},
            ]);

            // * root
        } else {
            arr = Reflect.getMetadataKeys(this.value).map((c) => [
                c as symbol,
                Reflect.getMetadata(c, this.value) as {},
            ]);
        }

        if (isModel(this.value)) {
            arr = arr.concat(
                Reflect.getMetadataKeys(this.value.constructor).map((c) => [
                    c as symbol,
                    Reflect.getMetadata(c, (this.value as T & AnyModel).constructor) as {},
                ])
            );
        }

        return new Map(arr);
    }

    @computed
    get order(): number {
        if (this.decorators.size != 0) {
            const order = this.decorators.get($order) as OrderOptions;
            if (order) return order.order;
        }
        return 0;
    }

    @computed
    get value(): T {
        if (!this.path) return this.tree.instance as any;
        return get(this.parentProperty.value, this.path)!;
    }

    set value(value) {
        if (!this.path) this.tree.instance = value as any;
        applySet(this.parentProperty.value, this.path, value);
    }

    @computed
    get members() {
        var arr: Property[] = [];
        function walk(prop: Property | PropertyGroup) {
            if (prop instanceof Property) arr.push(prop);
            else arr.push(...prop.members);
        }
        this.children.forEach(walk);
        return arr;
    }

    @computed
    get groups() {
        return this.children.filter((p) => p instanceof PropertyGroup);
    }

    onAttachedToRootStore() {
        if (this.inited) throw new Error("Property is already inited");

        this.root = getRootStore(this)!;
        this.parent = findParent<Property>(this, (p) => p instanceof Property)!;

        const modelDisposer = reaction(
            () => isModel(this.value),
            (v) => this.observeModel(v),
            { fireImmediately: true }
        );

        this.inited = true;

        return () => {
            console.log("Disposed Property");
            modelDisposer();
            this.propertiesDisposer?.();
        };
    }

    private observeModel(isModel: boolean) {
        if (isModel) {
            this.propertiesDisposer = reaction(
                () => this.value,
                (v) => this.buildProperties(v),
                { fireImmediately: true }
            );
        } else {
            this.propertiesDisposer?.();
        }
    }

    @modelAction
    private buildProperties(value: T) {
        if (isModel(value)) {
            const groupIds: string[] = [];
            const children: (Property | PropertyGroup)[] = [];
            for (let key of ownKeys(value)) {
                const group = getGroupMetadata(value, key);
                if (!group) {
                    children.push(new Property({ name: key.toString(), path: key }));
                } else {
                    const groupId = group[1].groupId.split("/")[0];
                    const id = group[0].toString() + "-" + groupId;
                    if (!groupIds.includes(id)) {
                        children.push(PropertyGroup.create(group[0], groupId));
                        groupIds.push(id);
                    }
                }
            }
            this.children = children;
        } else {
            this.children = [];
        }
    }

    toString() {
        return this.path.toString();
    }
}

@model("EnxEasy/PropertyGroup")
export class PropertyGroup extends Model({
    groupId: prop<string>(),
    children: prop<(Property | PropertyGroup)[]>(() => []),
}) {
    readonly symbol!: symbol;
    private inited = false;
    private _host!: Property;

    @computed
    get name() {
        return this.groupId;
    }

    @computed
    get host() {
        return this._host;
    }

    @computed
    get decorators() {
        const arr: [PropertyKey, GroupOptions][] = [];
        for (let prop of this.children) {
            if (prop instanceof Property) {
                arr.push([prop.path, prop.decorators.get(this.symbol) as GroupOptions]);
            }
        }
        return arr;
    }

    @computed
    get order() {
        return Math.max(...this.decorators.map((d) => d[1].order || 0));
    }

    @computed
    get members() {
        var arr: Property[] = [];
        function walk(prop: Property | PropertyGroup) {
            if (prop instanceof Property) arr.push(prop);
            else arr.push(...prop.members);
        }
        this.children.forEach(walk);
        return arr;
    }

    @computed
    get groups() {
        return this.children.filter((c) => c instanceof PropertyGroup);
    }

    static create(groupType: symbol, groupId: string) {
        let group = new PropertyGroup({ groupId });
        //@ts-ignore
        group.symbol = groupType;
        return group;
    }

    onAttachedToRootStore() {
        if (this.inited) throw new Error("Property Group is already inited");
        if (!this.symbol) throw new Error("Create PropertyGroup with static create method please !");

        this._host = findParent<Property>(this, (p) => p instanceof Property)!;

        const groupIds: string[] = [];
        for (let key of ownKeys(this.host.value)) {
            if (typeof key === "number") throw new Error("Report to dev how you get this error");

            const group = Reflect.getMetadata(this.symbol, this.host.value, key) as GroupOptions;
            if (!group || !group.groupId.startsWith(this.groupId)) continue;

            if (group.groupId === this.groupId) {
                this.children.push(new Property({ name: key.toString(), path: key }));
            } else {
                if (!groupIds.includes(group.groupId)) {
                    this.children.push(PropertyGroup.create(this.symbol, group.groupId));
                    groupIds.push(group.groupId);
                }
            }
        }
    }
}
