import { createBaseDecorator } from "./base";
import { createGroupDecorator, GroupOptions } from "./group";

export interface FlexOptions extends GroupOptions {
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "start"
        | "end"
        | "left"
        | "right";
    alignItems?:
        | "stretch"
        | "flex-start"
        | "flex-end"
        | "center"
        | "baseline"
        | "first baseline"
        | "last baseline"
        | "start"
        | "end"
        | "self-start"
        | "self-end";
    alignContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch"
        | "start"
        | "end"
        | "baseline"
        | "first baseline"
        | "last baseline";
    flexOrder?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
}

export const [$flex, flex] = createGroupDecorator<FlexOptions>("flex");

export const [$nestedflex, nestedFlex] = createBaseDecorator<FlexOptions>("nested flex");
