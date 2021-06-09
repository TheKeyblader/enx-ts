import { isObservable, keys } from "mobx";
import { ZodObject, ZodTypeAny } from "zod";

export const ignoredKeys = ["constructor", "Symbol(mobx-stored-annotations)"];

export type schemaOf<T> = ZodObject<schema<T>>;
type schema<T extends {}> = { [index in keyof T]: ZodTypeAny };

function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

export function ownKeys(obj: object) {
    const arr: PropertyKey[] = [];
    let walk: any = obj;
    while (walk != Object.prototype) {
        var _keys = !isObservable(walk) ? Reflect.ownKeys(walk) : keys(walk);
        for (let key of _keys) {
            if (!ignoredKeys.includes(key.toString())) arr.push(key);
        }
        walk = Object.getPrototypeOf(walk);
    }
    return arr.filter(onlyUnique);
}

export function getGroupName(groupId: string, groupName?: string) {
    let parts = groupId.split("/");
    return groupName || parts[parts.length - 1];
}

export interface ClassConstructor<T> {
    new (...args: any[]): T;
    prototype: T & Object;
}

export type decorateMap<T> = {
    [Property in keyof T]?: PropertyDecorator[] | MethodDecorator[];
};

function clearDecorators<T>(constructor: ClassConstructor<T>) {
    for (let key of Reflect.getMetadataKeys(constructor)) {
        Reflect.deleteMetadata(key, constructor);
    }
    for (let prop of Reflect.ownKeys(constructor.prototype)) {
        for (let key of Reflect.getMetadataKeys(constructor.prototype)) {
            Reflect.deleteMetadata(key, constructor.prototype, prop);
        }
    }
}

export function decorateClass<T>(constructor: ClassConstructor<T>, map: decorateMap<T>, clear?: boolean) {
    if (clear) clearDecorators(constructor);
    for (let key in map) {
        Reflect.decorate(map[key]!, constructor.prototype, key);
    }
}
