import { createDrawChain, DrawChain, drawChainEquals, Property, PropertyGroup, Tree } from "@enx2/easy";
import { reaction } from "mobx";
import { AnyModel } from "mobx-keystone";
import React, { useEffect, useState } from "react";
import { getDrawerComponent } from "../drawers";

export interface DrawerPropertyProps {
    property: Property | PropertyGroup;
}

export function DrawProperty({ property }: DrawerPropertyProps) {
    const [chain, setChain] = useState<DrawChain>(() => createDrawChain(property));
    useEffect(
        () =>
            reaction(() => createDrawChain(property), setChain, {
                equals: drawChainEquals,
                fireImmediately: true,
            }),
        [property.$modelId]
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
    instance: AnyModel;
}

export function Easy({ instance }: EasyProps) {
    const [tree, setTree] = useState(() => Tree.create(instance));
    if (tree.instance != instance) setTree(Tree.create(instance));
    return <DrawProperty property={tree.rootProperty} />;
}
