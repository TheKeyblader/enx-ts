import { isObservableObject, makeObservable, observable, computed } from "mobx";
import { schemaOf } from "../core/utils";
import { FieldProperty } from "./fieldProperty";

export type TreeMode = "view" | "create" | "edit";

export class Tree<T extends {} = any> {
    readonly instance: T;
    readonly rootProperty: FieldProperty;

    @observable mode: TreeMode;
    @observable schema?: schemaOf<T>;

    constructor(instance: T, mode: TreeMode = "view", schema?: schemaOf<T>) {
        if (!isObservableObject(instance)) throw new Error("instance value mush be an observable object");
        this.instance = instance;
        this.rootProperty = new FieldProperty(this);
        this.mode = mode;
        this.schema = schema;
        this.dispose = this.rootProperty.dispose.bind(this.rootProperty);
        makeObservable(this);
    }

    @computed
    get validationResult() {
        if (!this.schema) throw new Error("No Schema set!");
        const result = this.schema.safeParse(this.instance);
        if (result.success) return null;
        else return result.error;
    }

    setMode(newMode: TreeMode) {
        this.mode = newMode;
    }

    setSchema(schema: schemaOf<T>) {
        this.schema = schema;
    }

    dispose: () => void;
}
