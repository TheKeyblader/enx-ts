import { createDrawChain, DrawChain, drawChainEquals, FieldProperty, GroupProperty, Tree } from "@enx2/easy";
import { isObservableObject, reaction } from "mobx";
import React, { useEffect, useState } from "react";
import { getDrawerComponent } from "../drawers";

export interface DrawerPropertyProps {
    property: FieldProperty | GroupProperty;
}

export function DrawProperty({ property }: DrawerPropertyProps) {
    const [chain, setChain] = useState<DrawChain>(() => createDrawChain(property));
    useEffect(
        () =>
            reaction(() => createDrawChain(property), setChain, {
                equals: drawChainEquals,
                fireImmediately: true,
            }),
        [property]
    );

    useEffect(
        () => () => {
            if (!property.isDisposed) {
                property.dispose();
            }
        },
        []
    );

    return <DrawNextDrawer chain={chain} index={-1} />;
}

export interface DrawNextDrawerProps {
    chain: DrawChain;
    index: number;
}

export function DrawNextDrawer({ chain, index }: DrawNextDrawerProps) {
    if (index + 1 >= chain.drawers.length) return null;
    const drawer = chain.drawers[index + 1];
    const Component = getDrawerComponent(drawer);
    if (!Component) throw new Error("Not found corresponding drawer for " + drawer.toString());
    return <Component chain={chain} index={index + 1} drawer={drawer} />;
}

export interface EasyProps {
    instance: object;
}

export function Easy({ instance }: EasyProps) {
    if (!isObservableObject(instance)) throw new Error("instance value mush be an observable object");
    const [tree, setTree] = useState(() => new Tree(instance));
    if (tree.instance != instance) {
        tree.dispose();
        setTree(new Tree(instance));
    }
    return <DrawProperty property={tree.rootProperty} />;
}
