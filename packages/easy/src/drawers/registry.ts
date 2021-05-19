import { DrawerBase, DrawerPriority } from "./base";
import { getDrawerId } from "./drawerId";

interface Registry {
    drawerType: DrawerConstructor<DrawerBase>;
    uninitializedDrawer: DrawerBase;
    priority: number;
}
export interface DrawerConstructor<T extends DrawerBase> {
    new (): T;
    prototype: T & Object;
}

export const registry = new Map<string, Registry>();

export function registerDrawer(drawerType: DrawerConstructor<DrawerBase>, priority = DrawerPriority.auto) {
    const id = getDrawerId(drawerType);
    if (registry.has(id))
        console.warn(
            `a drawer with name "${drawerType.name}" already exists (if you are using hot-reloading you may safely ignore this warning)`
        );
    registry.set(id, { drawerType, priority, uninitializedDrawer: new drawerType() });
}

export function unregisterDrawer(drawerType: DrawerConstructor<DrawerBase>) {
    registry.delete(getDrawerId(drawerType));
}
