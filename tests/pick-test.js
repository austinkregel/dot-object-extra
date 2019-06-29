var assert = require("chai").assert;
const dot = require("../");

describe("pick", function() {
    it("Should be able to pick a value", function() {
        var obj = {
            some: "value",
            already: "set",
        };

        var val = dot.pick("some", obj);

        assert.equal(val, "value");
    });

    it("Should be able to pick dotted value", function() {
        var obj = {
            some: {
                other: "value",
            },
        };

        var val = dot.pick("some.other", obj);

        assert.equal(val, "value");
    });

    it("Should be able to pick null properties", function() {
        var obj = {
            some: null,
        };

        var val = dot.pick("some", obj);

        assert.isTrue(val === null);
    });

    it("Should return undefined when picking an non-existing value", function() {
        var obj = {
            some: null,
        };

        var val = dot.pick("other", obj);

        assert.isTrue(val === undefined);
    });

    it("Should return undefined when picking an non-existing dotted value", function() {
        var obj = {
            some: null,
        };

        var val = dot.pick("some.other", obj);

        assert.isTrue(val === undefined);
    });

    // test a functionality
    it("should not change default array behavior behavor ", function() {
        let result = dot.pick("dot.[0].hi", {
            dot: [
                {
                    hi: "Logic",
                },
            ],
        });
        // add an assertion
        assert.isArray(result, "Logic");
    });

    it("should pass the notation into arrays and map over them", function() {
        let result = dot.pick("circle.circle.dot.dot", {
            circle: {
                circle: [
                    {
                        dot: {
                            dot: "coodie shots",
                        },
                    },
                ],
            },
        });

        assert.equal(result[0], "coodie shots");
    });

    it("should pass the notation into arrays when just returning an array ", function() {
        let result = dot.pick("hobbies.type", {
            ID: null,
            name: "Doe",
            "first-name": "John",
            age: 25,
            hobbies: [
                {
                    type: "reading",
                    keys: ["sci-fi"],
                },
                {
                    type: "cinema",
                    keys: ["action"],
                },
                {
                    type: "sports",
                    keys: ["volley-ball", "badminton"],
                },
            ],
            address: {},
        });

        assert.deepEqual(result, ["reading", "cinema", "sports"]);
    });
});
