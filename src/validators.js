const isArray = arg => Array.isArray(arg);

const isBool = arg => typeof arg === "boolean";

const isInt = arg => Number.isInteger(arg);

const isFloat = arg => Number(arg) === arg && arg % 1 !== 0;

const isString = arg => typeof arg === "string";

const hasProperty = (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

module.exports = {
    isArray,
    isBool,
    isInt,
    isFloat,
    isString,
    hasProperty
};
