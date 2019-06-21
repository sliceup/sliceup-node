const axios = require('axios');

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

function slice(lhs, rhs) {
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
        if (cmd['by'] != undefined) {
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

module.exports = function(ip) {
	return new SliceUp(ip);
};
