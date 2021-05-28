import { drawer, SystemDrawerPriority, ValueDrawer } from "@enx2/easy";
import { isObservableObject } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { ReactDrawerProps, registerDrawer } from "./base";
import { DrawProperty } from "../components/property";

function is(obj: any): obj is object {
    return isObservableObject(obj);
}

@drawer("easy-react/model")
class ModelDrawer extends ValueDrawer<object> {
    constructor() {
        super(is);
    }
}

const ReactModelDrawer = observer(function ReactModelDrawer({ drawer }: ReactDrawerProps<ModelDrawer>) {
    return (
        <div>
            {drawer.property.children
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((p) => (
                    <div key={p.id}>
                        <DrawProperty property={p} />
                    </div>
                ))}
        </div>
    );
});

registerDrawer(ModelDrawer, ReactModelDrawer, SystemDrawerPriority.auto as any);
