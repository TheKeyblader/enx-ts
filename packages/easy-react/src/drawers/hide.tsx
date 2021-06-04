import { $hide, DecoratorDrawer, drawer, DrawerType } from "@enx2/easy";
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

registerDrawer(HideDrawer, ReactHideDrawer, DrawerType.attribute, -1);
