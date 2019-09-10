const { isBool, isInt, isFloat, isString } = require('./helpers.js');

// Unary functions

function id(name) {
    return { 'Id': name }
}

function alias(id, name) {
    return { 'ColAlias': [id, toId(name)] }
}

function avg(arg) {
    return { 'Avg': toId(arg) }
}

function bool(arg) {
    return { 'Bool': arg }
}

function count(arg) {
    return { 'Count': toId(arg) }
}

function datetime(y, mm, dd, h, m, s) {
    mm = mm.toString().padStart(2, "0");
    dd = dd.toString().padStart(2, "0");
    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    s = s.toString().padStart(2, "0");
    return { 'Datetime': y + '/' + mm +'/' + dd + 'T' + h +':' + m +':' + s }
}

function dev(arg) {
    return { 'Dev': toId(arg) }
}

function float(arg) {
    return { 'Float': arg }
}

function int(arg) {
    return { 'Int': arg }
}

function last(arg) {
    return { 'Last': toId(arg) }
}

function max(arg) {
    return { 'Max': toId(arg) }
}

function min(arg) {
    return { 'Min': toId(arg) }
}

function month(arg) {
    return { 'Month': toId(arg) }
}

function str(arg) {
    return { 'Str': arg }
}

function sum(arg) {
    return { 'Sum': toId(arg) }
}

function sums(arg) {
    return { 'Sums': toId(arg) }
}

function time(h, m, s) {
    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    s = s.toString().padStart(2, "0");
    return {'Time': h + ':' + m + ':' + s}
}

function unique(arg) {
    return { 'Unique': toId(arg) }
}

function variance(arg) {
    return { 'Var': toId(arg) }
}

function year(arg) {
    return { 'Year': toId(arg) }

}

// Binary functions

function add(lhs, rhs) {
    return { 'Add': [toId(lhs), toTypedExpresion(rhs)] }
}

function bar(lhs, rhs) {
    return { 'Bar': [toId(lhs), toTypedExpresion(rhs)] }
}

function div(lhs, rhs) {
    return { 'Div': [toId(lhs), toTypedExpresion(rhs)] }
}

function ema(id, alpha) {
    return { 'Ema': [toId(id), int(alpha)] }
}

function eq(lhs, rhs) {
    return { 'Eq': [toId(lhs), toTypedExpresion(rhs)] }
}

function gt(lhs, rhs) {
    return { 'Gt': [toId(lhs), toTypedExpresion(rhs)] }
}

function gte(lhs, rhs) {
    return { 'Gte': [toId(lhs), toTypedExpresion(rhs)] }
}

function lt(lhs, rhs) {
    return { 'Lt': [toId(lhs), toTypedExpresion(rhs)] }
}

function lte(lhs, rhs) {
    return { 'Lte': [toId(lhs), toTypedExpresion(rhs)] }
}

function mavg(id, lookback) {
    return { 'MAvg': [toId(id), int(lookback)] }
}

function mdev(id, lookback) {
    return { 'MDev': [toId(id), int(lookback)] }
}

function mul(lhs, rhs) {
    return { 'Mul': [toId(lhs), toTypedExpresion(rhs)] }
}

function neq(lhs, rhs) {
    return { 'Neq': [toId(lhs), toTypedExpresion(rhs)] }
}

function sub(lhs, rhs) {
    return { 'Sub': [toId(lhs), toTypedExpresion(rhs)] }
}

// Helpers

function toId(arg) {
    if (isString(arg)) {
        arg = id(arg)
    }
    return arg
}

function toTypedExpresion(arg) {
    if (isBool(arg)) {
        return bool(arg)
    } else if (isInt(arg)) {
        return int(arg)
    } else if (isFloat(arg)) {
        return float(arg)
    } else if (isString(arg)) {
        return str(arg)
    }

    return arg
}

module.exports = {
    id: id,
    add: add,
    alias: alias,
    avg: avg,
    bar: bar,
    bool: bool,
    count: count,
    datetime: datetime,
    dev: dev,
    div: div,
    ema: ema,
    eq: eq,
    float: float,
    gt: gt,
    gte: gte,
    int: int,
    last: last,
    lt: lt,
    lte: lte,
    mavg: mavg,
    max: max,
    mdev: mdev,
    min: min,
    month: month,
    mul: mul,
    neq: neq,
    str: str,
    sub: sub,
    sum: sum,
    sums: sums,
    time: time,
    unique: unique,
    variance: variance,
    year: year
};
