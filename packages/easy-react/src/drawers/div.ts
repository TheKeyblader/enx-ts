import { drawer, DecoratorDrawer, DrawerType } from "@enx2/easy";
import React from "react";
import { ReactDrawerProps, registerDrawer } from "./base";
import { DrawNextDrawer } from "../components";
import { DivOptions, $div } from "../decorators";

@drawer("easy-react/div")
class DivDrawer<K extends keyof JSX.IntrinsicElements> extends DecoratorDrawer<DivOptions<K>> {
    constructor() {
        super($div);
    }
}

function ReactDivDrawer<K extends keyof JSX.IntrinsicElements>({
    chain,
    drawer,
    index,
}: ReactDrawerProps<DivDrawer<K>>) {
    var { tag, ...props } = drawer.decorator;

    return React.createElement(tag, props, React.createElement(DrawNextDrawer, { chain, index }));
}

registerDrawer(DivDrawer, ReactDivDrawer, DrawerType.attribute, -1);
