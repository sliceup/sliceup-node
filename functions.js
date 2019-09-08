function id(name) {
    return { 'Id': name }
}

function avg(expr) {
    return { 'Avg': _to_id(expr) }
}

function sum(expr) {
    return { 'Sum': _to_id(expr) }
}

function count(expr) {
    return { 'Count': _to_id(expr) }
}

function last(expr) {
    return { 'Last': _to_id(expr) }
}

function max(expr) {
    return { 'Max': _to_id(expr) }
}

function min(expr) {
    return { 'Min': _to_id(expr) }
}

function year(expr) {
    return { 'Year': _to_id(expr) }

}

function month(expr) {
    return { 'Month': _to_id(expr) }

}

function time(h, m, s) {
    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    s = s.toString().padStart(2, "0");
    return {'Time': h + ':' + m + ':' + s}
}

function bar(lhs, rhs) {
    return { 'Bar': [_to_id(lhs)], rhs }
}

function _to_id(expr) {
    if (typeof expr === 'string') {
        expr = id(expr)
    }
    return expr
}

module.exports = {
    id: id,
    avg: avg,
    sum: sum,
    count: count,
    last: last,
    max: max,
    min: min,
    year: year,
    month: month,
    time: time,
    bar: bar
};
