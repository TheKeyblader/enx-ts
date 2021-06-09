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
    if (drawer.property.tree.mode == "view") return <span>{drawer.property.value}</span>;

    function change(event: React.ChangeEvent<HTMLInputElement>) {
        drawer.property.value = event.currentTarget.valueAsNumber || 0;
    }

    return (
        <span>
            <input
                type="number"
                name={drawer.property.path!.toString()}
                onChange={change}
                value={drawer.property.value}
            />
            {drawer.property.hasErrors && <div> {drawer.property.errorMessage}</div>}
        </span>
    );
});

registerDrawer(NumberDrawer, ReactNumberDrawer, DrawerType.value, -1);
