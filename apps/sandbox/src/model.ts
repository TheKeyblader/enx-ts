import faker from "faker";
import { action, computed, makeAutoObservable } from "mobx";
import { flex, nestedFlex, title } from "@enx2/easy";

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
    @computed
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

    values = [1, 2, 3];

    constructor() {
        makeAutoObservable(this);

        const add = action(() => {
            this.values.push(this.values.length + 1);
            if (this.values.length == 10) {
                clearInterval(val);
                val = setInterval(remove, 1000);
            }
        });

        const remove = action(() => {
            this.values.pop();
            if (this.values.length == 0) {
                clearInterval(val);
                val = setInterval(add, 1000);
            }
        });

        var val = setInterval(add, 1000);
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
