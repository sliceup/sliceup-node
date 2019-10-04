const { isBool, isInt, isFloat, isString } = require("./helpers.js");

///// Unary functions

/**
 * Selects a column.
 *
 * Selects a column with id by given name.
 *
 * @param {string} name Column name.
 *
 * @returns {object} {Id: string}
 */
function id(name) {
    return { Id: name };
}

/**
 * Aliases a column.
 *
 * Creates 'name' alias of the selected column.
 *
 * @param {string} id   Column id.
 * @param {string} name Column alias.
 *
 * @returns {object} {ColAlias: [{Id: string}, string]}
 */
function alias(id, name) {
    return { ColAlias: [toId(id), name] };
}

/**
 * Calculates the arithmetic mean.
 *
 * Calculates the arithmetic mean of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Avg: {Id: string}}
 */
function avg(id) {
    return { Avg: toId(id) };
}

/**
 * Describes boolean value.
 *
 * Creates the object describing given boolean value.
 *
 * @param {boolean} arg Boolean value.
 *
 * @returns {object} {Bool: boolean}
 */
function bool(arg) {
    return { Bool: arg };
}

/**
 * Counts the rows.
 *
 * Counts the rows in the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Count: {Id: string}}
 */
function count(id) {
    return { Count: toId(id) };
}

/**
 * Describes datetime value.
 *
 * Creates the object describing datetime with given parameters.
 *
 * @param {number} y     Year.
 * @param {number} mm    Month.
 * @param {number} dd    Day.
 * @param {number} [h=0] Hour.
 * @param {number} [m=0] Minute.
 * @param {number} [s=0] Second.
 *
 * @returns {object} {Datetime: string}
 */
function datetime(y, mm, dd, h, m, s) {
    h = typeof h !== "undefined" ? h : 0;
    m = typeof m !== "undefined" ? m : 0;
    s = typeof s !== "undefined" ? s : 0;

    const datetime =
        `${y}-${mm.toString().padStart(2, "0")}-${dd.toString().padStart(2, "0")}` +
        `T${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;

    return { Datetime: datetime };
}

/**
 * Calculates the standard deviation.
 *
 * Calculates the standard deviation of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Dev: {Id: string}}
 */
function dev(id) {
    return { Dev: toId(id) };
}

/**
 * Describes float value.
 *
 * Creates the object describing given float value.
 *
 * @param {number} arg Float value.
 *
 * @returns {object} {Float: number}
 */
function float(arg) {
    return { Float: arg };
}

/**
 * Describes integer value.
 *
 * Creates the object describing given integer value.
 *
 * @param {number} arg Integer value.
 *
 * @returns {object} {Int: number}
 */
function int(arg) {
    return { Int: arg };
}

/**
 * Selects the last row.
 *
 * Selects the last of the rows in the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Last: {Id: string}}
 */
function last(id) {
    return { Last: toId(id) };
}

/**
 * Finds the maximum.
 *
 * Finds the maximum value of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Max: {Id: string}}
 */
function max(id) {
    return { Max: toId(id) };
}

/**
 * Finds the minimum.
 *
 * Finds the minimum value of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Min: {Id: string}}
 */
function min(id) {
    return { Min: toId(id) };
}

/**
 * Gets the month.
 *
 * Gets the month of the selected column of type datetime.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Month: {Id: string}}
 */
function month(id) {
    return { Month: toId(id) };
}

/**
 * Describes string value.
 *
 * Creates the object describing given string value.
 *
 * @param {string} arg String value.
 *
 * @returns {object} {Str: string}
 */
function str(arg) {
    return { Str: arg };
}

/**
 * Calculates the sum.
 *
 * Calculates the sum of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Sum: {Id: string}}
 */
function sum(id) {
    return { Sum: toId(id) };
}

/**
 * Calculates the rolling cumulative sum.
 *
 * Calculates the rolling cumulative sum of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Sums: {Id: string}}
 */
function sums(id) {
    return { Sums: toId(id) };
}

/**
 * Describes time value.
 *
 * Creates the object describing time with given parameters.
 *
 * @param {number} h Hour.
 * @param {number} m Minute.
 * @param {number} s Second.
 *
 * @returns {object} {Time: string}
 */
function time(h, m, s) {
    const time = `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

    return { Time: time };
}

/**
 * Finds all unique values.
 *
 * Finds all unique values in the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Unique: {Id: string}}
 */
function unique(id) {
    return { Unique: toId(id) };
}

/**
 * Calculates the variance.
 *
 * Calculates the variance of the selected column.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Var: {Id: string}}
 */
function variance(id) {
    return { Var: toId(id) };
}

/**
 * Gets the year.
 *
 * Gets the year of the selected column of type datetime.
 *
 * @param {string} id Column id.
 *
 * @returns {object} {Year: {Id: string}}
 */
function year(id) {
    return { Year: toId(id) };
}

///// Binary functions

/**
 * Performs vectorized addition.
 *
 * Adds the value to the rows of the selected column.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Addition value.
 *
 * @returns {object} {Add: [{Id: string}, object]}
 */
function add(lhs, rhs) {
    return { Add: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Calculates bar values.
 *
 * Calculates bar values into buckets.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Distribution value.
 *
 * @returns {object} {Bar: [{Id: string}, object]}
 */
function bar(lhs, rhs) {
    return { Bar: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Performs vectorized division.
 *
 * Divides the selected column rows by the denominator value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Denominator value.
 *
 * @returns {object} {Div: [{Id: string}, object]}
 */
function div(lhs, rhs) {
    return { Div: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Calculates the exponential moving average.
 *
 * Calculates the exponential moving average of the selected column.
 *
 * @param {string} id    Column id.
 * @param {number} alpha Distribution value.
 *
 * @returns {object} {Ema: [{Id: string}, number]}
 */
function ema(id, alpha) {
    return { Ema: [toId(id), int(alpha)] };
}

/**
 * Filters equal values.
 *
 * Filters rows of the selected column equal to the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Eq: [{Id: string}, object]}
 */
function eq(lhs, rhs) {
    return { Eq: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Filters greater values.
 *
 * Filters rows of the selected column greater than the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Gt: [{Id: string}, object]}
 */
function gt(lhs, rhs) {
    return { Gt: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Filters greater or equal values.
 *
 * Filters rows of the selected column greater than or equal to the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Gte: [{Id: string}, object]}
 */
function gte(lhs, rhs) {
    return { Gte: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Filters lesser values.
 *
 * Filters rows of the selected column lesser than the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Lt: [{Id: string}, object]}
 */
function lt(lhs, rhs) {
    return { Lt: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Filters lesser or equal values.
 *
 * Filters rows of the selected column lesser than or equal to the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Lte: [{Id: string}, object]}
 */
function lte(lhs, rhs) {
    return { Lte: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Calculates the moving average.
 *
 * Calculates the moving average of the selected column.
 *
 * @param {string} id       Column id.
 * @param {number} lookback Number of points to look back from.
 *
 * @returns {object} {MAvg: [{Id: string}, number]}
 */
function mavg(id, lookback) {
    return { MAvg: [toId(id), int(lookback)] };
}

/**
 * Calculates the moving standard deviation.
 *
 * Calculates the moving standard deviation of the selected column.
 *
 * @param {string} id       Column id.
 * @param {number} lookback Number of points to look back from.
 *
 * @returns {object} {MDev: [{Id: string}, number]}
 */
function mdev(id, lookback) {
    return { MDev: [toId(id), int(lookback)] };
}

/**
 * Performs vectorized multiplication.
 *
 * Multiply the selected column rows by the factor value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Factor value.
 *
 * @returns {object} {Mul: [{Id: string}, object]}
 */
function mul(lhs, rhs) {
    return { Mul: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Filters not equal values.
 *
 * Filters rows of the selected column not equal to the given value.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Compared value.
 *
 * @returns {object} {Neq: [{Id: string}, object]}
 */
function neq(lhs, rhs) {
    return { Neq: [toId(lhs), toTypedExpresion(rhs)] };
}

/**
 * Performs vectorized subtraction.
 *
 * Subtracts the value from the rows of the selected column.
 *
 * @param {string} lhs Column id.
 * @param {number} rhs Subtraction value.
 *
 * @returns {object} {Sub: [{Id: string}, object]}
 */
function sub(lhs, rhs) {
    return { Sub: [toId(lhs), toTypedExpresion(rhs)] };
}

// Helpers

function toId(arg) {
    if (isString(arg)) {
        arg = id(arg);
    }
    return arg;
}

function toTypedExpresion(arg) {
    if (isBool(arg)) {
        return bool(arg);
    } else if (isInt(arg)) {
        return int(arg);
    } else if (isFloat(arg)) {
        return float(arg);
    } else if (isString(arg)) {
        return str(arg);
    }

    return arg;
}

module.exports = {
    id,
    add,
    alias,
    avg,
    bar,
    bool,
    count,
    datetime,
    dev,
    div,
    ema,
    eq,
    float,
    gt,
    gte,
    int,
    last,
    lt,
    lte,
    mavg,
    max,
    mdev,
    min,
    month,
    mul,
    neq,
    str,
    sub,
    sum,
    sums,
    time,
    unique,
    variance,
    year
};
