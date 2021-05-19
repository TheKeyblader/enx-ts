import {
    DrawChain,
    DrawerBase,
    DrawerConstructor,
    DrawerPriority,
    getDrawerId,
    registerDrawer as _registerDrawer,
    unregisterDrawer as _unregisterDrawer,
} from "@enx2/easy";
import React from "react";

export interface ReactDrawerProps<D extends DrawerBase = DrawerBase> {
    drawer: D;
    chain: DrawChain;
    //Position in drawchain
    index: number;
}

const drawerMap = new Map<string, React.ComponentType<ReactDrawerProps<any>>>();

export function registerDrawer<D extends DrawerBase>(
    drawerType: DrawerConstructor<D>,
    component: React.ComponentType<ReactDrawerProps<D>>,
    priority = DrawerPriority.auto
) {
    _registerDrawer(drawerType, priority);
    drawerMap.set(getDrawerId(drawerType), component);
}

export function unregisterDrawer(drawerType: DrawerConstructor<DrawerBase>) {
    _unregisterDrawer(drawerType);
    drawerMap.delete(getDrawerId(drawerType));
}

export function getDrawerComponent<D extends DrawerBase>(drawer: D) {
    return drawerMap.get(getDrawerId(drawer)) as React.ComponentType<ReactDrawerProps<D>>;
}
