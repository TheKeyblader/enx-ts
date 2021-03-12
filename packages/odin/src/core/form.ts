import { $mobx, makeAutoObservable } from "mobx";
import { Field } from "./field";

export interface FormOptions {
    mode?: SystemModes | string;
}

export enum SystemModes {
    Add = "Add",
    Edit = "Edit",
    View = "View",
}

const ignoredKeys = ["constructor", $mobx.toString(), "Symbol(mobx-inferred-annotations)"];

export class Form<T extends Object> {
    mode: SystemModes | string;
    path = "this";
    instance: T;
    readonly fields: Field<T, keyof T>[];

    constructor(instance: T, options: FormOptions) {
        this.instance = instance;
        this.mode = options.mode ?? SystemModes.View;
        this.fields = this.createFields();
        makeAutoObservable(this);
    }

    private createFields() {
        let fields: Field<T, keyof T>[] = [];
        let search = this.instance;
        while (search && search != Object.prototype) {
            for (let key of Reflect.ownKeys(search)) {
                if (ignoredKeys.includes(key.toString())) continue;
                fields.push(new Field(this, key as keyof T));
            }
            search = Object.getPrototypeOf(search);
        }
        return fields;
    }
}
