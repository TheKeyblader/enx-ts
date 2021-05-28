import { $title, DecoratorDrawer, drawer, DrawerPriority, SystemDrawerPriority, TitleOptions } from "@enx2/easy";
import React, { Fragment } from "react";
import { ReactDrawerProps } from ".";
import { DrawNextDrawer } from "../components";
import { registerDrawer } from "./base";

@drawer("easy-react/title")
class TitleDrawer extends DecoratorDrawer<TitleOptions> {
    constructor() {
        super($title);
    }
}

function ReactTitleDrawer({ chain, drawer, index }: ReactDrawerProps<TitleDrawer>) {
    return (
        <Fragment>
            <div>
                <h1>{drawer.decorator.title}</h1>
                {drawer.decorator.subTitle && <h2>{drawer.decorator.subTitle}</h2>}
            </div>
            <DrawNextDrawer chain={chain} index={index} />
        </Fragment>
    );
}

registerDrawer(TitleDrawer, ReactTitleDrawer, SystemDrawerPriority.attribute as any);
