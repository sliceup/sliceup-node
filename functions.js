// Unary functions

function id(name) {
    return { 'Id': name }
}

function alias(id, name) {
    return { 'ColAlias': [_to_id(id), name] }
}

function avg(arg) {
    return { 'Avg': _to_id(arg) }
}

function bool(arg) {
    return { 'Bool': _to_id(arg) }
}

function count(arg) {
    return { 'Count': _to_id(arg) }
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
    return { 'Dev': _to_id(arg) }
}

function float(arg) {
    return { 'Float': _to_id(arg) }
}

function int(arg) {
    return { 'Int': _to_id(arg) }
}

function last(arg) {
    return { 'Last': _to_id(arg) }
}

function max(arg) {
    return { 'Max': _to_id(arg) }
}

function min(arg) {
    return { 'Min': _to_id(arg) }
}

function month(arg) {
    return { 'Month': _to_id(arg) }
}

function str(arg) {
    return { 'String': _to_id(arg) }
}

function sum(arg) {
    return { 'Sum': _to_id(arg) }
}

function sums(arg) {
    return { 'Sums': _to_id(arg) }
}

function time(h, m, s) {
    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    s = s.toString().padStart(2, "0");
    return {'Time': h + ':' + m + ':' + s}
}

function unique(arg) {
    return { 'Unique': _to_id(arg) }
}

function variance(arg) {
    return { 'Var': _to_id(arg) }
}

function year(arg) {
    return { 'Year': _to_id(arg) }

}

// Binary functions

function bar(lhs, rhs) {
    return { 'Bar': [_to_id(lhs), rhs] }
}

function _to_id(arg) {
    if (typeof arg === 'string') {
        arg = id(arg)
    }
    return arg
}

module.exports = {
    id: id,
    alias: alias,
    avg: avg,
    bar: bar,
    bool: bool,
    count: count,
    datetime: datetime,
    dev: dev,
    float: float,
    int: int,
    last: last,
    max: max,
    min: min,
    month: month,
    str: str,
    sum: sum,
    sums: sums,
    time: time,
    unique: unique,
    variance: variance,
    year: year
};
