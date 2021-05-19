import {
    $flex,
    $nestedflex,
    drawer,
    DrawerPriority,
    FlexOptions,
    GroupDrawer,
    Property,
    PropertyGroup,
} from "@enx2/easy";
import { observer } from "mobx-react-lite";
import React from "react";
import { DrawProperty } from "../components";
import { ReactDrawerProps, registerDrawer } from "./base";

@drawer("easy-react/number")
class FlexDrawer extends GroupDrawer<FlexOptions> {
    constructor() {
        super($flex);
    }
}

const ReactFlexDrawer = observer(function ReactFlexDrawer({ drawer }: ReactDrawerProps<FlexDrawer>) {
    const mergedOpt = Object.assign({}, ...drawer.decorators.map((d) => d[1])) as FlexOptions;
    const childOpt = Object.assign(
        {},
        ...(drawer.property.children.filter((p) => p instanceof Property) as Property[]).map(
            (p) => p.decorators.get($nestedflex) as FlexOptions | undefined
        )
    ) as FlexOptions;
    const style: React.CSSProperties = {
        display: "flex",
        flexDirection: mergedOpt.flexDirection,
        flexWrap: mergedOpt.flexWrap,
        justifyContent: mergedOpt.justifyContent,
        alignItems: mergedOpt.alignItems,
        alignContent: mergedOpt.alignContent,
        order: childOpt.flexOrder,
        flexGrow: childOpt.flexGrow,
        flexShrink: childOpt.flexShrink,
        flexBasis: childOpt.flexBasis,
        alignSelf: childOpt.alignSelf,
    };
    return (
        <div style={style}>
            {drawer.property.children
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((p) => (
                    <ReactFlexChild key={p.$modelId} property={p} />
                ))}
        </div>
    );
});

type Unarray<T> = T extends Array<infer U> ? U : T;

interface ReactFlexChildProps {
    property: Property | PropertyGroup;
}

const ReactFlexChild = observer(function ReactFlexChild({ property }: ReactFlexChildProps) {
    if (property instanceof PropertyGroup) return <DrawProperty property={property} />;
    const opt = property.decorators.get($flex) as FlexOptions;
    const style: React.CSSProperties = {
        order: opt.flexOrder,
        flexGrow: opt.flexGrow,
        flexShrink: opt.flexShrink,
        flexBasis: opt.flexBasis,
        alignSelf: opt.alignSelf,
    };
    return (
        <div style={style}>
            <DrawProperty property={property} />
        </div>
    );
});

registerDrawer(FlexDrawer, ReactFlexDrawer, DrawerPriority.attribute);
