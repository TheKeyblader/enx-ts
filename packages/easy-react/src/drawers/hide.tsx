import { $hide, DecoratorDrawer, drawer, SystemDrawerPriority } from "@enx2/easy";
import { registerDrawer } from "./base";

@drawer("easy-react/hide")
class HideDrawer extends DecoratorDrawer<{}> {
    constructor() {
        super($hide);
    }
}

function ReactHideDrawer() {
    return null;
}

registerDrawer(HideDrawer, ReactHideDrawer, SystemDrawerPriority.super as any);
