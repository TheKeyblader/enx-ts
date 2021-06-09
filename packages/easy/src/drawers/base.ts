import { GroupOptions } from "../decorators";
import { FieldProperty, GroupProperty } from "../models";

export enum DrawerType {
    auto,
    value,
    attribute,
    super,
}

export abstract class DrawerBase<T extends FieldProperty | GroupProperty = FieldProperty | GroupProperty> {
    private _initialized = false;
    private _property!: T;
    readonly priority!: number;
    readonly type!: DrawerType;

    get initialized() {
        return this._initialized;
    }

    get property() {
        return this._property;
    }

    get tree() {
        return this.property.tree;
    }

    init(property: T) {
        if (!this._initialized) {
            this._property = property;
            try {
                this.initialize();
            } finally {
                this._initialized = true;
            }
        }
    }

    initialize() {}

    canDrawProperty(property: FieldProperty | GroupProperty) {
        return true;
    }
}

export abstract class ValueDrawer<K> extends DrawerBase<FieldProperty<K>> {
    constructor(private _guardFunc: (obj: any) => obj is K) {
        super();
    }

    canDrawProperty(property: FieldProperty | GroupProperty) {
        if (property instanceof FieldProperty && this._guardFunc(property.value))
            return this.canDrawValueProperty(property);
        return false;
    }

    canDrawValueProperty(property: FieldProperty) {
        return true;
    }
}

export abstract class DecoratorDrawer<O extends {}, K extends FieldProperty = FieldProperty> extends DrawerBase<K> {
    constructor(private _name: string) {
        super();
    }

    get decoratorName() {
        return this._name;
    }

    get decorator() {
        return this.property.decorators.get(this._name) as O;
    }

    canDrawProperty(property: FieldProperty | FieldProperty) {
        if (property instanceof FieldProperty && property.decorators.has(this._name))
            return this.canDrawDecoratorProperty(property);
        return false;
    }

    canDrawDecoratorProperty(property: FieldProperty) {
        return true;
    }
}

export abstract class DecoratorValueDrawer<O extends {}, K> extends DecoratorDrawer<O, FieldProperty<K>> {
    constructor(sym: string, private _guardFunc: (obj: any) => obj is K) {
        super(sym);
    }

    canDrawDecoratorProperty(property: FieldProperty) {
        if (this._guardFunc(property.value)) return this.canDrawDecoratorValueProperty(property);
        return false;
    }

    canDrawDecoratorValueProperty(property: FieldProperty) {
        return true;
    }
}

export abstract class GroupDrawer<O extends GroupOptions> extends DrawerBase<GroupProperty> {
    constructor(private _sym: string) {
        super();
    }

    get decorators() {
        return this.property.decorators as Map<PropertyKey, O>;
    }

    canDrawProperty(property: FieldProperty | GroupProperty) {
        if (property instanceof GroupProperty && property.type == this._sym) return this.canDrawGroupProperty(property);
        return false;
    }

    canDrawGroupProperty(property: GroupProperty) {
        return true;
    }
}
