import * as React from "react";
import { Button, Classes, IButtonProps } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import { useRoot } from "../stores/rootstore";

type DarkButtonProps = Omit<
    IButtonProps<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>,
    "icon" | "onClick"
>;

export const DarkButton = observer(function DarkButton(props: DarkButtonProps) {
    const root = useRoot();
    return <Button icon={root.ui.darkMode ? "moon" : "flash"} onClick={root.ui.toogleDarkMode} {...props} />;
});

export const DarkContainer = observer(function DarkContainer(props: React.PropsWithChildren<{}>) {
    const root = useRoot();
    return (
        <div id="app" className={classnames({ [Classes.DARK]: root.ui.darkMode })}>
            {props.children}
        </div>
    );
});
