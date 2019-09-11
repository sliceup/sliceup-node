const axios = require('axios');
const { id } = require('./functions.js');

class Sliceup {
    constructor(ip, port) {
        port = typeof port !== 'undefined' ? port : '8080';
        this.host = 'http://' + ip + ':' + port + '/';
    }

    async create(config) {
        return await this._post_request('create', config);
    }

    async summary() {
        return await this._get_request('summary');
    }

    async insert(data) {
        return await this._post_request('insert', data);
    }

    async describe(name) {
        return await this._post_request('describe', { name: name });
    }

    async query(cmd) {
        cmd = this._process_args('select', cmd);
        cmd = this._process_args('by', cmd);
        cmd = this._process_from(cmd);
        return await this._post_request('query', cmd);
    }

    async _get_request(method, payload) {
        const rsp = await axios.get(this.host + method, payload);
        return rsp.data;
    }

    async _post_request(method, payload) {
        const rsp = await axios.post(this.host + method, payload);
        return rsp.data;
    }

    _process_args(key, cmd) {
        if (cmd.hasOwnProperty(key)) {
            const p = cmd[key];
            for (let i = 0; i < p.length; i++) {
                if (typeof p[i] === 'string') {
                    cmd[key][i] = id(p[i]);
                }
            }
        }
        return cmd;
    }

    _process_from(cmd) {
        if (cmd.hasOwnProperty('from')) {
            const f = cmd.from;
            if (typeof f === 'string') {
                cmd.from = {'Table': f}
            }
        }
        return cmd;
    }
}

module.exports = {
    Sliceup: Sliceup
};
