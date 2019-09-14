const axios = require('axios');
const { id } = require('./functions.js');
const { QueryData } = require('./queryData.js');

/** @class Represents SliceUp client. */
class Sliceup {

    /**
     * Creates a Sliceup client.
     *
     * @param {string} ip            Connection ip address.
     * @param {string} [port='8080'] Connection port.
     */
    constructor(ip, port) {
        port = typeof port !== 'undefined' ? port : '8080';
        this.host = 'http://' + ip + ':' + port + '/';
    }

    /**
     * Creates the table.
     *
     * Creates the table with the given parameters in the database.
     *
     * @param {object} config New table configuration.
     * @returns {Promise<object>}
     */
    async create(config) {
        return await this._post_request('create', config);
    }

    /**
     * Summarizes the database.
     *
     * Summarizes the database configuration.
     *
     * @returns {Promise<object>}
     */
    async summary() {
        return await this._get_request('summary');
    }

    /**
     * Inserts the data.
     *
     * Inserts the given data into the database.
     *
     * @param {object} data New row data.
     * @returns {Promise<object>}
     */
    async insert(data) {
        return await this._post_request('insert', data);
    }

    /**
     * @param {string} name
     * @returns {Promise<object>}
     */
    async describe(name) {
        return await this._post_request('describe', { name: name });
    }

    /**
     * Queries the data.
     *
     * Queries the database using the given parameters.
     *
     * @param {object} cmd Query parameters.
     * @returns {Promise<QueryData>}
     */
    async query(cmd) {
        cmd = this._process_args('select', cmd);
        cmd = this._process_args('where', cmd);
        cmd = this._process_args('by', cmd);
        cmd = this._process_from(cmd);
        return new QueryData(await this._post_request('query', cmd));
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
            if(!Array.isArray(cmd[key])) {
                cmd[key] = [cmd[key]];
            }
            for (let i = 0; i < cmd[key].length; i++) {
                if (typeof cmd[key][i] === 'string') {
                    cmd[key][i] = id(cmd[key][i]);
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
