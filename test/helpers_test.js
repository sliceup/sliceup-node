const { describe, it } = require("mocha");

const assert = require("assert");

const { processQueryArgs, processDeleteArgs, fixUrl } = require("../src/helpers.js");

describe("Helpers", () => {
    describe("#processQueryArgs()", () => {
        describe("#in 'select'", () => {
            const testCases = [
                { name: "single string", args: "str", expected: [{ Id: "str" }] },
                {
                    name: "strings array",
                    args: ["str1", "str2", "str3"],
                    expected: [{ Id: "str1" }, { Id: "str2" }, { Id: "str3" }]
                },
                {
                    name: "unary functions",
                    args: { count: "str" },
                    expected: [{ Count: { Id: "str" } }]
                },
                {
                    name: "unary functions array",
                    args: [{ count: "str1" }, { sum: "str2" }],
                    expected: [{ Count: { Id: "str1" } }, { Sum: { Id: "str2" } }]
                }
            ];

            testCases.forEach(test => {
                it(`should process '${test.name}'`, () => {
                    assert.deepStrictEqual(
                        processQueryArgs(selectWrap(test.args)),
                        selectWrap(test.expected)
                    );
                });
            });
        });

        describe("#in 'by'", () => {
            const testCases = [
                { name: "single string", args: "str", expected: [{ Id: "str" }] },
                {
                    name: "binary functions",
                    args: { bar: ["str", { time: [1, 0, 0] }] },
                    expected: [{ Bar: [{ Id: "str" }, { Time: "01:00:00" }] }]
                }
            ];

            testCases.forEach(test => {
                it(`should process '${test.name}'`, () => {
                    assert.deepStrictEqual(
                        processQueryArgs(byWrap(test.args)),
                        byWrap(test.expected)
                    );
                });
            });
        });
    });

    describe("#processDeleteArgs()", () => {
        it("should process args as expected", () => {
            assert.deepStrictEqual(processDeleteArgs("str"), ["str"]);
            assert.deepStrictEqual(processDeleteArgs(["str1", "str2"]), ["str1", "str2"]);
        });
    });

    describe("#fixUrl()", () => {
        it("should properly convert urls", () => {
            assert.strictEqual(fixUrl("localhost"), "http://localhost/");
            assert.strictEqual(fixUrl("demo.sliceup"), "http://demo.sliceup/");
            assert.strictEqual(fixUrl("demo.sliceup/"), "http://demo.sliceup/");
            assert.strictEqual(fixUrl("demo.sliceup:8000"), "http://demo.sliceup:8000/");
            assert.strictEqual(fixUrl("https://demo.sliceup"), "https://demo.sliceup/");
            assert.strictEqual(fixUrl("https://demo.sliceup:8000"), "https://demo.sliceup:8000/");
        });
    });
});

// Helpers

const selectWrap = cmd => wrapAround("select", cmd);

const byWrap = cmd => wrapAround("by", cmd);

const wrapAround = (prop, cmd) => {
    const obj = {};
    obj[prop] = cmd;
    return obj;
};
