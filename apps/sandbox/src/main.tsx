import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import { Easy } from "@enx2/easy-react";
import { Card, CreateCard } from "./models/card";
import { Tree, schemaOf } from "@enx2/easy";
import { Callout } from "@blueprintjs/core";
import { z } from "zod";

faker.locale = "fr";

const schema: schemaOf<Card> = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    age: z.number().int(),
    website: z.string().min(1, "Required").url(),
});

function App() {
    const [tree] = React.useState(() => new Tree(new Card(faker.helpers.createCard())));
    const [createTree] = React.useState(() => new Tree(new CreateCard(faker.helpers.createCard()), "create", schema));

    return (
        <div>
            <Callout title={"View"}>
                <Easy tree={tree} />
            </Callout>
            <Callout title={"Create"}>
                <Easy tree={createTree} />
            </Callout>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
