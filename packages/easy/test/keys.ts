import { describe, it } from "mocha";
import { assert } from "chai";
import { Tree } from "../src";
import { order } from "../src/decorators/order";
import { makeObservable, observable } from "mobx";
import { ownKeys } from "../src/core/utils";

class Test {
    @observable @order(-1) property1 = "Hello";
    @observable property2 = 1;
    @observable @order(1) property3 = "World!";

    constructor() {
        makeObservable(this);
    }
}

describe("Keys", function () {
    it("ownKeys", function () {
        var keys = ownKeys(new Test());

        assert.equal(keys.length, 3);
        assert.equal(keys[0], "property1");
        assert.equal(keys[1], "property2");
        assert.equal(keys[2], "property3");
    });

    it("properties tree", function () {
        var tree = new Tree(new Test());

        assert.equal(tree.rootProperty.children.length, 3);
    });
});
