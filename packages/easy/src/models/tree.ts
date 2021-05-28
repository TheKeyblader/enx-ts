import { FieldProperty } from "./fieldProperty";

export class Tree<T extends {} = any> {
    readonly instance: T;
    readonly rootProperty: FieldProperty;

    constructor(instance: T) {
        this.instance = instance;
        this.rootProperty = new FieldProperty(this);
        this.dispose = this.rootProperty.dispose.bind(this.rootProperty);
    }

    dispose: () => void;
}
