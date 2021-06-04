import { drawer, DecoratorDrawer, DrawerType } from "@enx2/easy";
import React from "react";
import { ReactDrawerProps, registerDrawer } from "./base";
import { DrawNextDrawer } from "../components";
import { $customComponent, CustomComponentOptions } from "../decorators";

@drawer("easy-react/customComponent")
class CustomComponentDrawer<P = {}> extends DecoratorDrawer<CustomComponentOptions<P>> {
    constructor() {
        super($customComponent);
    }
}

function ReactCustomComponentDrawer<P = {}>({ chain, drawer, index }: ReactDrawerProps<CustomComponentDrawer<P>>) {
    var { type, props } = drawer.decorator;

    return React.createElement(type, props, React.createElement(DrawNextDrawer, { chain, index }));
}

registerDrawer(CustomComponentDrawer, ReactCustomComponentDrawer, DrawerType.attribute, -1);
