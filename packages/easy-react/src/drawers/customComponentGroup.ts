import React from "react";
import merge from "lodash.merge";
import { drawer, DrawerType, FieldProperty, GroupDrawer } from "@enx2/easy";
import { $customComponentGroup, CustomComponentGroupOptions } from "../decorators";
import { ReactDrawerProps, registerDrawer } from "./base";
import { DrawProperty } from "../components";

@drawer("easy-react/customComponentGroup")
class CustomComponentGroupDrawer<P = {}> extends GroupDrawer<CustomComponentGroupOptions<P>> {
    constructor() {
        super($customComponentGroup);
    }
}

function ReactCustomComponentGroupDrawer<P = {}>({ drawer }: ReactDrawerProps<CustomComponentGroupDrawer<P>>) {
    var decorators = Array.from(drawer.decorators);
    var opts = Array.from(drawer.decorators.values());
    var { type, props } = merge({}, ...opts) as CustomComponentGroupOptions<P>;

    decorators.sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    let children = decorators.map(([key, opt]) => {
        var prop = drawer.property.children.find((c) => (c as FieldProperty).path == key)!;
        return React.createElement(DrawProperty, { key: key.toString(), property: prop });
    });
    return React.createElement(type, props, children);
}

registerDrawer(CustomComponentGroupDrawer, ReactCustomComponentGroupDrawer, DrawerType.attribute, -1);
