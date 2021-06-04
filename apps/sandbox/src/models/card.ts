import { makeAutoObservable } from "mobx";
import { Card as _Card, H1, H3 } from "@blueprintjs/core";
import { customComponent, customComponentGroup, div } from "@enx2/easy-react";
import { hide, decorateClass } from "@enx2/easy";

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

    website: string;
    constructor(card: Faker.Card) {
        this.name = card.name;
        this.username = card.username;
        this.email = card.email;
        this.phone = card.phone;
        this.website = card.website;
        makeAutoObservable(this);
    }
}

decorateClass(Card, {
    website: [div, customComponentGroup("A", _Card), hide()],
});
