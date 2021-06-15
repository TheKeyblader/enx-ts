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
    if (drawer.tree.mode == "view") return React.createElement(React.Fragment, void 0, drawer.property.value);

    function change(event: React.ChangeEvent<HTMLInputElement>) {
        drawer.property.value = event.currentTarget.value;
    }

    return (
        <span>
            <input name={drawer.property.path!.toString()} onChange={change} value={drawer.property.value} />
            {drawer.property.message && <div>{drawer.property.message}</div>}
        </span>
    );
});

registerDrawer(StringDrawer, ReactStringDrawer, DrawerType.value, -1);
