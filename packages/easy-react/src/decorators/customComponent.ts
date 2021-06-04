import { createBaseDecorator } from "@enx2/easy";
import React from "react";

export interface CustomComponentOptions<P = {}> {
    type: React.ComponentType<P>;
    props?: P;
}

const [$customComponent, _customComponent] = createBaseDecorator<CustomComponentOptions<any>>("customComponent");

export { $customComponent };

export function customComponent<P = {}>(type: React.ComponentType<P>, props?: P): PropertyDecorator {
    return _customComponent({ type, props });
}
