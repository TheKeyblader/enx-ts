import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "tailwindcss/tailwind.css";
import "./css/global.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./pages/shared/app";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
