const { Sliceup } = require('./src/sliceup');
const { id, last, sum, str, bar, time,
        unique, max, eq, float, datetime,
        dev, neq, month, lt, count, variance,
        alias, gte, lte, avg, min, bool,
        year, sums, gt, int } = require('./src/functions.js');

/**
 * Sliceup client.
 * @module sliceup
 */
module.exports = {
    Sliceup: Sliceup,
    id: id,
    alias: alias,
    avg: avg,
    bar: bar,
    bool: bool,
    count: count,
    datetime: datetime,
    dev: dev,
    eq: eq,
    float: float,
    gt: gt,
    gte: gte,
    int: int,
    last: last,
    lt: lt,
    lte: lte,
    max: max,
    min: min,
    month: month,
    neq: neq,
    str: str,
    sum: sum,
    sums: sums,
    time: time,
    unique: unique,
    variance: variance,
    year: year
};
