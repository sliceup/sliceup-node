const { describe, it } = require("mocha");

const assert = require("assert");

const { isBool, isInt, isFloat, isString, hasProperty } = require("../src/validators.js");

describe("Validators", () => {
    describe("#isBool()", () => {
        it("should properly discover types", () => {
            assert.strictEqual(isBool(true), true);
            assert.strictEqual(isBool(false), true);

            assert.strictEqual(isBool("true"), false);
            assert.strictEqual(isBool("false"), false);
            assert.strictEqual(isBool("string"), false);
            assert.strictEqual(isBool("1.0"), false);
            assert.strictEqual(isBool(1.0), false);
            assert.strictEqual(isBool(1), false);
            assert.strictEqual(isString({}), false);
        });
    });

    describe("#isFloat()", () => {
        it("should properly discover types", () => {
            assert.strictEqual(isFloat(1.2), true);
            assert.strictEqual(isFloat(31231414123.3), true);
            assert.strictEqual(isFloat(-31231414123.3), true);

            assert.strictEqual(isFloat(""), false);
            assert.strictEqual(isFloat("string"), false);
            assert.strictEqual(isFloat("1.0"), false);
            assert.strictEqual(isFloat(1.0), false);
            assert.strictEqual(isFloat(1), false);
            assert.strictEqual(isString({}), false);
        });
    });

    describe("#isInt()", () => {
        it("should properly discover types", () => {
            assert.strictEqual(isInt(1.0), true);
            assert.strictEqual(isInt(-1.0), true);
            assert.strictEqual(isInt(2), true);
            assert.strictEqual(isInt(-3), true);

            assert.strictEqual(isInt(""), false);
            assert.strictEqual(isInt("string"), false);
            assert.strictEqual(isInt("1.0"), false);
            assert.strictEqual(isInt(1.2), false);
            assert.strictEqual(isString({}), false);
        });
    });

    describe("#isString()", () => {
        it("should properly discover types", () => {
            assert.strictEqual(isString(""), true);
            assert.strictEqual(isString("string"), true);
            assert.strictEqual(isString("1.0"), true);

            assert.strictEqual(isString(1.0), false);
            assert.strictEqual(isString(1.2), false);
            assert.strictEqual(isString(true), false);
            assert.strictEqual(isString({}), false);
        });
    });

    describe("#hasProperty()", () => {
        it("should check if passed value/object has property", () => {
            assert.strictEqual(hasProperty({ prop: "value" }, "prop"), true);
            assert.strictEqual(hasProperty({ p: "value" }, "prop"), false);
            assert.strictEqual(hasProperty({}, "prop"), false);
            assert.strictEqual(hasProperty([], "prop"), false);
            assert.strictEqual(hasProperty("123", "prop"), false);
            assert.strictEqual(hasProperty(123, "prop"), false);
        });
    });
});
