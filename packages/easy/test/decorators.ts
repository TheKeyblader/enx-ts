import { describe, it } from "mocha";
import { assert } from "chai";
import { decoratedModel, model, Model, prop, registerRootStore } from "mobx-keystone";
import { Property, Tree } from "../src";
import { order } from "../src/decorators/order";

@model("decorators")
class Test extends Model({
    property1: prop<string>(),
    property2: prop<number>(),
    property3: prop<string>(),
}) {}

decoratedModel(void 0, Test, {
    property1: [order(-1)],
    property3: [order(1)],
});

describe("Decorators - order", function () {
    it("negative - neutral - positive", function () {
        var tree = registerRootStore(
            new Tree({
                instance: new Test({ property1: "Hello", property2: 1, property3: "World !" }),
                rootProperty: new Property({
                    name: "Root",
                    path: "",
                }),
            })
        );

        assert.equal(tree.rootProperty.children[0].order, -1);
        assert.equal(tree.rootProperty.children[1].order, 0);
        assert.equal(tree.rootProperty.children[2].order, 1);
    });
});
