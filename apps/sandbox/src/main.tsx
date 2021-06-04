import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import { Easy } from "@enx2/easy-react";
import { Card } from "./models/card";

faker.locale = "fr";

function App() {
    const [card] = React.useState(() => new Card(faker.helpers.createCard()));

    return <Easy instance={card} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
