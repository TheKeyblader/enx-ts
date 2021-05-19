import { drawer, ValueDrawer } from "@enx2/easy";
import { AnyModel, isModel } from "mobx-keystone";
import { observer } from "mobx-react-lite";
import React from "react";
import { ReactDrawerProps, registerDrawer } from ".";
import { DrawProperty } from "../components/property";

@drawer("easy-react/model")
class ModelDrawer extends ValueDrawer<AnyModel> {
    constructor() {
        super(isModel);
    }
}

const ReactModelDrawer = observer(function ReactModelDrawer({ drawer }: ReactDrawerProps<ModelDrawer>) {
    return (
        <div>
            {drawer.property.children
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((p) => (
                    <div key={p.$modelId}>
                        <DrawProperty property={p} />
                    </div>
                ))}
        </div>
    );
});

registerDrawer(ModelDrawer, ReactModelDrawer);
