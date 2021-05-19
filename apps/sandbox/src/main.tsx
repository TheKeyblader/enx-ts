import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@enx2/easy-react";
import { Easy } from "@enx2/easy-react";
import { Person, User } from "./model";

function App() {
    const [instance, setInstance] = useState<Person | User>(() => new Person({}));

    function click() {
        setInstance(instance instanceof Person ? new User({}) : new Person({}));
    }

    return (
        <div>
            <Easy instance={instance} />
            <button onClick={click}>Change Instance</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
