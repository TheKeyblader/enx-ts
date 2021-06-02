import { drawer, DrawerPriority, FieldProperty, GroupDrawer, SystemDrawerPriority } from "@enx2/easy";
import React from "react";
import { $divGroup, DivGroupOptions } from "../decorators/divGroup";
import merge from "lodash.merge";
import { ReactDrawerProps, registerDrawer } from "./base";
import { DrawProperty } from "../components";

@drawer("easy-react/divGroup")
class DivGroupDrawer<K extends keyof JSX.IntrinsicElements> extends GroupDrawer<DivGroupOptions<K>> {
    constructor() {
        super($divGroup);
    }
}

function ReactDivGroupDrawer<K extends keyof JSX.IntrinsicElements>({ drawer }: ReactDrawerProps<DivGroupDrawer<K>>) {
    var decorators = Array.from(drawer.decorators);
    var opts = Array.from(drawer.decorators.values());
    var { tag, groupId, groupName, order, ...props } = merge({}, ...opts) as DivGroupOptions<K>;

    decorators.sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    let children = decorators.map(([key, opt]) => {
        var prop = drawer.property.children.find((c) => (c as FieldProperty).path == key)!;
        return React.createElement(DrawProperty, { key: key.toString(), property: prop });
    });
    return React.createElement(tag, props, children);
}

registerDrawer(DivGroupDrawer, ReactDivGroupDrawer, SystemDrawerPriority.attribute as any);
