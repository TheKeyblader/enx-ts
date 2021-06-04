import { ValueDrawer, drawer, DrawerType } from "@enx2/easy";
import { observer } from "mobx-react-lite";
import React from "react";
import { ReactDrawerProps, registerDrawer } from "./base";

function isNumber(obj: any): obj is number {
    return typeof obj === "number";
}

@drawer("easy-react/number")
class NumberDrawer extends ValueDrawer<number> {
    constructor() {
        super(isNumber);
    }
}

const ReactNumberDrawer = observer(function ReactNumberDrawer({ drawer }: ReactDrawerProps<NumberDrawer>) {
    return <span>{drawer.property.value}</span>;
});

registerDrawer(NumberDrawer, ReactNumberDrawer, DrawerType.value, -1);
