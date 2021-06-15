import { makeAutoObservable, observable } from "mobx";
import { Card as _Card, FormGroup, H1, H3 } from "@blueprintjs/core";
import { customComponent, customComponentGroup, div } from "@enx2/easy-react";
import { datatype } from "faker";

const test = Symbol("Test");

export class Card {
    @customComponent(H1, { className: "text-center" })
    name: string;

    @customComponent(H3)
    username: string;

    @customComponentGroup("A", _Card)
    @div
    email: string;

    @customComponentGroup("A", _Card)
    @div
    phone: string;

    @customComponentGroup("A", _Card)
    @div
    website: string;

    constructor(card: Faker.Card) {
        this.name = card.name;
        this.username = card.username;
        this.email = card.email;
        this.phone = card.phone;
        this.website = card.website;
        Object.defineProperty(this, test, { value: "hello", configurable: true, enumerable: true, writable: true });
        makeAutoObservable(this);
    }
}

export class CreateCard {
    @div
    name: string;

    @div
    username: string;

    @customComponentGroup("A", _Card)
    @div
    email: string;

    @customComponentGroup("A", _Card)
    phone: string;

    @div
    age: number;

    website: string;
    constructor(card: Faker.Card) {
        this.name = card.name;
        this.username = card.username;
        this.email = card.email;
        this.phone = card.phone;
        this.age = datatype.number(100);
        this.website = card.website;
        makeAutoObservable(this);
    }
}
