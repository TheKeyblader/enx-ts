import { drawer, DrawerType, ValueDrawer } from "@enx2/easy";
import React from "react";
import { observer } from "mobx-react-lite";
import { ReactDrawerProps, registerDrawer } from "./base";

function isString(obj: any): obj is string {
    return typeof obj === "string";
}

@drawer("easy-react/string")
class StringDrawer extends ValueDrawer<string> {
    constructor() {
        super(isString);
    }
}

const ReactStringDrawer = observer(function ReactStringDrawer({ drawer }: ReactDrawerProps<StringDrawer>) {
    return React.createElement(React.Fragment, void 0, drawer.property.value);
});

registerDrawer(StringDrawer, ReactStringDrawer, DrawerType.value, -1);
