import * as React from "react";
import * as ReactDOM from "react-dom";
import { Form } from "@enx2/odin";
import { Data } from "./data";

const data = new Data();
const form = new Form(data, {});
console.log(form);

function App() {
    return <div>Hello</div>;
}

ReactDOM.render(<App />, document.getElementById("root"));
