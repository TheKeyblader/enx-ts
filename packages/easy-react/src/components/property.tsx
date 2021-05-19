import { createDrawChain, DrawChain, drawChainEquals, Property, PropertyGroup, Tree } from "@enx2/easy";
import { autorun, reaction } from "mobx";
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
            }),
        [property]
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
    tree: Tree;
}

export function Easy({ tree }: EasyProps) {
    return <DrawProperty property={tree.rootProperty} />;
}
