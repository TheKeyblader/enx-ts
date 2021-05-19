import { GroupOptions } from "../decorators";
import { Property, PropertyGroup } from "../models";

export enum DrawerPriority {
    auto,
    value,
    attribute,
    super,
}

export abstract class DrawerBase<T extends Property | PropertyGroup = Property | PropertyGroup> {
    private _initialized = false;
    private _property!: T;
    readonly priority!: number;

    get initialized() {
        return this._initialized;
    }

    get property() {
        return this._property;
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

    canDrawProperty(property: Property | PropertyGroup) {
        return true;
    }
}

export abstract class ValueDrawer<K> extends DrawerBase<Property<K>> {
    constructor(private _guardFunc: (obj: any) => obj is K) {
        super();
    }

    canDrawProperty(property: Property | PropertyGroup) {
        if (property instanceof Property && this._guardFunc(property.value)) return this.canDrawValueProperty(property);
        return false;
    }

    canDrawValueProperty(property: Property) {
        return true;
    }
}

export abstract class DecoratorDrawer<O extends {}, K extends Property = Property> extends DrawerBase<K> {
    constructor(private _sym: symbol) {
        super();
    }

    get decorator() {
        return this.property.decorators.get(this._sym) as O;
    }

    canDrawProperty(property: Property | PropertyGroup) {
        if (property instanceof Property && property.decorators.has(this._sym))
            return this.canDrawDecoratorProperty(property);
        return false;
    }

    canDrawDecoratorProperty(property: Property) {
        return true;
    }
}

export abstract class DecoratorValueDrawer<O extends {}, K> extends DecoratorDrawer<O, Property<K>> {
    constructor(sym: symbol, private _guardFunc: (obj: any) => obj is K) {
        super(sym);
    }

    canDrawDecoratorProperty(property: Property) {
        if (this._guardFunc(property.value)) return this.canDrawDecoratorValueProperty(property);
        return false;
    }

    canDrawDecoratorValueProperty(property: Property) {
        return true;
    }
}

export abstract class GroupDrawer<O extends GroupOptions> extends DrawerBase<PropertyGroup> {
    constructor(private _sym: symbol) {
        super();
    }

    get decorator() {
        return this.property.options as O;
    }

    canDrawProperty(property: Property | PropertyGroup) {
        if (property instanceof PropertyGroup && property.symbol == this._sym)
            return this.canDrawGroupProperty(property);
        return false;
    }

    canDrawGroupProperty(property: PropertyGroup) {
        return true;
    }
}
