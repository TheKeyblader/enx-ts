import * as React from "react";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet-async";
import { useRoot } from "../../stores/rootstore";

export default observer(function Header() {
    const root = useRoot();
    return (
        <Helmet>
            <title>{root.ui.title}</title>
        </Helmet>
    );
});
