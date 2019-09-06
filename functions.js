function eq(lhs, rhs) {
    return { 'Eq': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function neq(lhs, rhs) {
    return { 'Neq': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function lt(lhs, rhs) {
    return { 'Lt': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function lte(lhs, rhs) {
    return { 'Lte': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function gt(lhs, rhs) {
    return { 'Gt': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function gte(lhs, rhs) {
    return { 'Gte': [{ 'Id': lhs }, { 'Long': rhs }] }
}

function slice(lhs) {
    return { 'Slice': [{ 'Id': lhs }, { 'Time': '00:00:02' }] }
}

function avg(expr) {
    return { 'Avg': { 'Id': expr } }
}

function sum(expr) {
    return { 'Sum': { 'Id': expr } }
}

function min(expr) {
    return { 'Min': { 'Id': expr } }
}

function max(expr) {
    return { 'Max': { 'Id': expr } }
}

function count(expr) {
    return { 'Count': { 'Id': expr } }
}

function id(expr) {
    return { 'Id': expr }
}

module.exports = {
    eq: eq,
    neq: neq,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    slice: slice,
    avg: avg,
    sum: sum,
    min: min,
    max: max,
    count: count,
    id: id
};
