import { Callout } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { configure } from "mobx";
import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import "css/global.css";

if (import.meta.env.DEV) {
    configure({
        enforceActions: "always",
        computedRequiresReaction: true,
        reactionRequiresObservable: true,
        disableErrorBoundaries: true,
    });
}

ReactDOM.render(<Callout>Hello World !</Callout>, document.getElementById("root"));
