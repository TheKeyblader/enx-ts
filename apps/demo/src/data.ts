import { title } from "@enx2/odin";
import { makeAutoObservable } from "mobx";

const symbol = Symbol("symbol act");
const symbol2 = Symbol("symbol prop");

export class Data {
    bool = false;
    @title({})
    string = "Hello World !";
    number = 0;
    [symbol2] = "Hello Symbol !";

    constructor() {
        makeAutoObservable(this);
    }

    hello() {
        console.log("Hello World !");
    }

    [symbol]() {
        console.log("Hello Symbol !");
    }
}
