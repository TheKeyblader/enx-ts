import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import React from "react";
import ReactDOM from "react-dom";
import { flex, Tree, order, title } from "@enx2/easy";
import "@enx2/easy-react";
import { decoratedModel, model, Model, modelAction, prop } from "mobx-keystone";
import { computed } from "mobx";
import { Easy } from "@enx2/easy-react";

@title("Test 1")
@model("Test")
class Test extends Model({
    property1: prop<string>(),
    property2: prop<number>(),
    property3: prop<number>(),
    nested: prop<Test2>(),
}) {
    @flex({ groupId: "A", order: 20 })
    @computed
    get date() {
        return new Date(this.property3);
    }

    @modelAction
    hello() {
        this.property1 = "Hello !";
    }
}

decoratedModel(void 0, Test, {
    property2: [order(-1), title("title 1")],
});

@title("test 2")
@model("Test2")
class Test2 extends Model({
    property1: prop<string>().withSetter(),
    property2: prop<number>(),
    property3: prop<number>(),
}) {
    @flex({ groupId: "A" })
    @computed
    get date() {
        return new Date(this.property3);
    }

    @flex({ groupId: "B" })
    @modelAction
    hello() {
        this.property1 = "Hello !";
    }

    onAttachedToRootStore() {
        const id = setInterval(() => {
            this.setProperty1(new Date(Date.now()).toLocaleString());
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }
}

let tree = Tree.create(
    new Test({
        property1: "Hello",
        property2: 42,
        property3: Date.now(),
        nested: new Test2({ property1: "Hello", property2: 42, property3: Date.now() }),
    })
);

function App() {
    return (
        <div>
            <div>Hello World !</div>
            <Easy tree={tree} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
