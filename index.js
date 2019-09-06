const axios = require('axios');
const { eq, neq, lt, lte, gt,
        gte, slice, avg, sum,
        min, max, count, id} = require('./functions.js');

class SliceUp {
    constructor(ip) {
        this.url = 'http://' + ip + ':8080/';
    }

    async delete(name) {
        let rsp = await axios.post(this.url + 'delete', { name: name });
        return rsp.data;
    }

    async query(cmd) {
        for (let i = 0; i < cmd.select.length; i++) {
            let e = cmd.select[i];
            if (typeof e === 'string') {
                cmd.select[i] = id(e);
            }
        }
        if (cmd['by'] !== undefined) {
            for (let i = 0; i < cmd.by.length; i++) {
                let e = cmd.by[i];
                if (typeof e === 'string') {
                    cmd.by[i] = id(e);
                }
            }
        }
        let rsp = await axios.post(this.url + 'query', cmd);
        return rsp.data;
    }

    async create(config) {
        let rsp = await axios.post(this.url + 'create', config);
        return rsp.data;
    }

    async insert(data) {
        let rsp = await axios.post(this.url + 'insert', data);
        return rsp.data;
    }

    async summary() {
        let rsp = await axios.get(this.url + 'summary');
        return rsp.data.Ok;
    }
}

module.exports = {
    SliceUp: SliceUp,
    eq: eq,
    neq: neq,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    slice: slice,
    sum: sum,
    min: min,
    max: max,
    count: count,
    id: id
};
