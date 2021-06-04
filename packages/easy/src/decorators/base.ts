import { isObservableObject } from "mobx";
import "reflect-metadata";

export interface createBaseDecorator<O extends {}> {
    (name: string): [string, (options: O) => PropertyDecorator];
}

export function createBaseDecorator<O extends {}>(name: string): [string, (options: O) => PropertyDecorator] {
    if (name.indexOf(":") != -1) throw new Error("name of decorator cannot contains ':'");
    const func = function (options: O): PropertyDecorator {
        return function (target, propertyKey) {
            if (Reflect.hasMetadata(name, target, propertyKey)) {
                let count = getDecoratorLength(name, target, propertyKey);
                Reflect.defineMetadata(name + ":" + count, options, target, propertyKey);
            } else Reflect.defineMetadata(name, options, target, propertyKey);
        };
    };
    return [name, func];
}

function getDecoratorLength(decoratorName: string, target: any, propertyKey?: string | symbol) {
    var count = 0;
    if (propertyKey) {
        for (let key of Reflect.getMetadataKeys(target, propertyKey)) {
            if (typeof key === "string" && key.startsWith(decoratorName + ":")) count++;
        }
    } else {
        for (let key of Reflect.getMetadataKeys(target)) {
            if (typeof key === "string" && key.startsWith(decoratorName + ":")) count++;
        }
    }

    let value = propertyKey ? target[propertyKey] : target;
    if (isObservableObject(value)) {
        var prototype = Object.getPrototypeOf(value);
        for (let key of Reflect.getMetadataKeys(prototype.constructor)) {
            if (typeof key === "string" && key.startsWith(decoratorName + ":")) count++;
        }
    }

    return count;
}
