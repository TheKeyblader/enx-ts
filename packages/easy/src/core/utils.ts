import { isObservable, keys } from "mobx";

export const ignoredKeys = ["constructor", "Symbol(mobx-stored-annotations)"];

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
