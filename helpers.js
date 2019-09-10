function isBool(arg) {
    return typeof arg === "boolean"
}

function isInt(arg) {
    Number.isInteger(arg)
}

function isFloat(arg) {
    return arg % 1 !== 0
}

function isString(arg) {
    return typeof arg === 'string'
}

module.exports = {
    isBool: isBool,
    isInt: isInt,
    isFloat: isFloat,
    isString: isString
};
