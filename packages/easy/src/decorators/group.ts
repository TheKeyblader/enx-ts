import { createBaseDecorator } from "./base";

export interface GroupOptions {
    groupId: string;
    groupName?: string;
    order?: number;
}

export const groupDecoratorKeys = new Set<string>();

export function createGroupDecorator<O extends GroupOptions>(name: string): ReturnType<createBaseDecorator<O>> {
    const tuple = createBaseDecorator<O>(name);
    groupDecoratorKeys.add(tuple[0]);
    return tuple;
}

export function getGroupMetadata(target: object, propertyKey: PropertyKey): [string, GroupOptions] | undefined {
    if (typeof propertyKey === "number") throw new Error("Report to dev how you get this error");

    const keys = Reflect.getMetadataKeys(target, propertyKey);
    let found: string | undefined;

    for (let key of keys) {
        if (groupDecoratorKeys.has(key)) {
            if (found) throw new Error("Multiple group attributes on " + propertyKey.toString() + " property");
            found = key;
        }
    }

    if (found) return [found, Reflect.getMetadata(found, target, propertyKey) as GroupOptions];
    else return void 0;
}
