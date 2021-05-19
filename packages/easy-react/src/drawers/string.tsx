import { drawer, ValueDrawer } from "@enx2/easy";
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

const ReactStringDrawer = observer(function ReactStringDrawer({ chain, drawer }: ReactDrawerProps<StringDrawer>) {
    return <span>{drawer.property.value}</span>;
});

registerDrawer(StringDrawer, ReactStringDrawer);
