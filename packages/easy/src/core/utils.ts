import { isObservable, keys } from "mobx";
import { frozenKey, modelIdKey, modelTypeKey, BaseModel } from "mobx-keystone";

export const ignoredKeys = [frozenKey, modelIdKey, modelTypeKey, "constructor", "$", "Symbol(mobx-stored-annotations)"];

function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

export function ownKeys(obj: object) {
    const arr: PropertyKey[] = [];
    let walk: any = obj;
    while (walk != BaseModel.prototype) {
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
