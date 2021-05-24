import faker from "faker";
import { computed, makeAutoObservable } from "mobx";
import { flex, nestedFlex, order, title } from "@enx2/easy";

@title("Person")
export class Person {
    @flex({ groupId: "A/1", flexGrow: 1 })
    @nestedFlex({ groupId: "A", flexGrow: 1 })
    firstName = faker.name.firstName();
    @flex({ groupId: "A/1", flexGrow: 1 })
    lastName = faker.name.lastName();
    age = faker.datatype.number(90);
    address = new Address();

    @flex({ groupId: "A", flexGrow: 1 })
    get fullName() {
        return this.firstName + " " + this.lastName;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

@title("Address")
export class Address {
    street = faker.address.streetAddress();
    zipCode = faker.address.zipCode();
    city = faker.address.city();

    constructor() {
        makeAutoObservable(this);
    }
}

@title("User")
export class User {
    username = faker.internet.userName();
    email = faker.internet.email();

    constructor() {
        makeAutoObservable(this);
    }
}
