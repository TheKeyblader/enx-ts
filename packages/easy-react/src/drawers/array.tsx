import { drawer, DrawerType, ValueDrawer } from "@enx2/easy";
import { isObservableArray } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { DrawProperty, Easy } from "../components";
import { ReactDrawerProps, registerDrawer } from "./base";

function isArray(obj: any): obj is any[] {
    return obj instanceof Array || isObservableArray(obj);
}

@drawer("easy-react/array")
class ArrayDrawer extends ValueDrawer<any[]> {
    constructor() {
        super(isArray);
    }
}

const ReactArrayDrawer = observer(function ReactArrayDrawer({ chain, drawer }: ReactDrawerProps<ArrayDrawer>) {
    return (
        <ul>
            {drawer.property.children.map((p) => (
                <li key={p.id}>
                    <DrawProperty property={p} />
                </li>
            ))}
        </ul>
    );
});

registerDrawer(ArrayDrawer, ReactArrayDrawer, DrawerType.value, -1);
