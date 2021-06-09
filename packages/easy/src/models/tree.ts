import { isObservableObject, makeObservable, observable } from "mobx";
import { FieldProperty } from "./fieldProperty";
import { schema } from "../core/utils";
import { ZodObject } from "zod";

export type TreeMode = "view" | "create" | "edit";

export class Tree<T extends {} = any> {
    readonly instance: T;
    readonly rootProperty: FieldProperty;

    @observable mode: TreeMode;
    @observable schema?: ZodObject<schema<T>>;

    constructor(instance: T, mode: TreeMode = "view", schema?: ZodObject<schema<T>>) {
        if (!isObservableObject(instance)) throw new Error("instance value mush be an observable object");
        this.instance = instance;
        this.rootProperty = new FieldProperty(this);
        this.mode = mode;
        this.schema = schema;
        this.dispose = this.rootProperty.dispose.bind(this.rootProperty);
        makeObservable(this);
    }

    setMode(newMode: TreeMode) {
        this.mode = newMode;
    }

    setSchema(schema: ZodObject<schema<T>>) {
        this.schema = schema;
    }

    dispose: () => void;
}
