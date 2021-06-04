import { DrawerBase, DrawerType } from "./base";
import { getDrawerId } from "./drawerId";

interface Registry {
    constructor: DrawerConstructor<DrawerBase>;
    uninitializedDrawer: DrawerBase;
    type: DrawerType;
    priority: number;
}
export interface DrawerConstructor<T extends DrawerBase> {
    new (): T;
    prototype: T & Object;
}

export const registry = new Map<string, Registry>();

export function registerDrawer(constructor: DrawerConstructor<DrawerBase>, type: DrawerType, priority = 0) {
    const id = getDrawerId(constructor);
    if (registry.has(id))
        console.warn(
            `a drawer with name "${constructor.name}" already exists (if you are using hot-reloading you may safely ignore this warning)`
        );
    registry.set(id, { constructor, priority, uninitializedDrawer: new constructor(), type });
}

export function unregisterDrawer(drawerType: DrawerConstructor<DrawerBase>) {
    registry.delete(getDrawerId(drawerType));
}
