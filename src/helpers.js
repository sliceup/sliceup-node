function isBool(arg) {
    return typeof arg === "boolean";
}

function isInt(arg) {
    return Number.isInteger(arg);
}

function isFloat(arg) {
    return Number(arg) === arg && arg % 1 !== 0;
}

function isString(arg) {
    return typeof arg === "string";
}

module.exports = {
    isBool,
    isInt,
    isFloat,
    isString
};
