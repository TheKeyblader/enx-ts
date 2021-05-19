import { decoratedModel, model, Model, prop } from "mobx-keystone";
import faker from "faker";
import { computed } from "mobx";
import { flex, nestedFlex, order, title } from "@enx2/easy";

@title("Person")
@model("Person")
export class Person extends Model({
    firstName: prop(() => faker.name.firstName()),
    lastName: prop(() => faker.name.lastName()),
    age: prop(() => faker.datatype.number(90)),
    address: prop(() => new Address({})),
}) {
    @computed
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}

decoratedModel(void 0, Person, {
    fullName: flex({ groupId: "A", flexGrow: 1 }),
    firstName: [flex({ groupId: "A/1", flexGrow: 1 }), nestedFlex({ groupId: "A", flexGrow: 1 })],
    lastName: flex({ groupId: "A/1", flexGrow: 1 }),
});

@title("Address")
@model("Address")
export class Address extends Model({
    street: prop(() => faker.address.streetAddress()),
    zipCode: prop(() => faker.address.zipCode()),
    city: prop(() => faker.address.city()),
}) {}

@title("User")
@model("User")
export class User extends Model({
    username: prop(() => faker.internet.userName()),
    email: prop(() => faker.internet.email()),
}) {}
