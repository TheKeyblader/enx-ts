import { model, Model, prop, AnyModel, registerRootStore } from "mobx-keystone";
import { Property } from "./property";

@model("EnxEasy/Tree")
export class Tree extends Model({
    instance: prop<AnyModel>().withSetter(),
    rootProperty: prop<Property>(
        () =>
            new Property({
                name: "",
                path: "",
            })
    ),
}) {
    static create(model: AnyModel) {
        return registerRootStore(
            new Tree({
                instance: model,
            })
        );
    }
}
