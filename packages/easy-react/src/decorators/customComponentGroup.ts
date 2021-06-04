import { createGroupDecorator, GroupOptions } from "@enx2/easy";
import React from "react";

export interface CustomComponentGroupOptions<P = {}> extends GroupOptions {
    type: React.ComponentType<P>;
    props?: P;
}

const [$customComponentGroup, _customComponentGroup] =
    createGroupDecorator<CustomComponentGroupOptions<any>>("customComponentGroup");

export { $customComponentGroup };

export function customComponentGroup<P = {}>(
    groupId: string,
    type: React.ComponentType<P>,
    prop?: P & Omit<GroupOptions, "groupId">
) {
    return _customComponentGroup({ type, groupId, ...prop });
}
