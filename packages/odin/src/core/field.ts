import { makeAutoObservable, ObservableMap } from "mobx";
import { BaseOptions } from "../attributes";
import { Form } from "./form";

export interface IField<T extends object, K extends keyof T> {
    readonly instance: T;
    readonly key: K;
    readonly path: string;
    label: string;
    value: T[K];
    state: ObservableMap<symbol, any>;
    readonly children: T[K] extends object ? Field<T[K], keyof T[K]>[] : null;
    readonly metadata: ObservableMap<symbol, BaseOptions>;
}

export class Field<T extends Object, K extends keyof T> {
    readonly parent: Form<T> | Field<any, any>;
    readonly key: K;
    readonly path: string;
    label: string;
    state: ObservableMap<symbol, any>;
    readonly children: T[K] extends Object ? Field<T[K], keyof T[K]>[] : null;
    readonly metadata: ObservableMap<symbol, BaseOptions>;

    get instance(): T {
        if (this.parent instanceof Form) return this.parent.instance;
        else return this.parent.value;
    }

    get value() {
        return this.instance[this.key];
    }

    constructor(parent: Form<T> | Field<any, any>, key: K) {
        this.parent = parent;
        this.key = key;
        this.path = this.parent.path + "." + key.toString();
        this.label = key.toString();
        this.state = new ObservableMap();
        //@ts-expect-error
        if (typeof this.value === "object") this.children = [];
        //@ts-expect-error
        else this.children = null;
        this.metadata = new ObservableMap();
        makeAutoObservable(this);
    }
}
