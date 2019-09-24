const axios = require('axios');
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
        return await this._postRequest('create', config);
    }

    /**
     * Summarizes the database.
     *
     * Summarizes the database configuration.
     *
     * @returns {Promise<object>}
     */
    async summary() {
        return await this._getRequest('summary');
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
        return await this._postRequest('insert', data);
    }

    /**
     * Inserts the data.
     *
     * Inserts the given data into the database.
     *
     * @param {object} data New row data.
     * @returns {Promise<object>}
     */
    async delete(cmd) {
        cmd = processDeleteArgs(cmd);
        return await this._postRequest('delete', cmd);
    }

    /**
     * @param {string} name
     * @returns {Promise<object>}
     */
    async describe(name) {
        return await this._postRequest('describe', { name: name });
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
        cmd = processQueryArgs(cmd);
        return new QueryData(await this._postRequest('query', cmd));
    }

    async _getRequest(method, payload) {
        const rsp = await axios.get(this.host + method, payload);
        return rsp.data;
    }

    async _postRequest(method, payload) {
        const rsp = await axios.post(this.host + method, payload);
        return rsp.data;
    }
}

// Args processing

function processQueryArgs(cmd) {
    const columnArgs = ['select', 'where', 'by'];
    for (let key of columnArgs) {
        if (cmd.hasOwnProperty(key)) {
            cmd[key] = toArgsArray(cmd[key]);
            for (let i = 0; i < cmd[key].length; i++) {
                if (typeof cmd[key][i] === 'string') {
                    cmd[key][i] = toId(cmd[key][i]);
                }
            }
        }
    }

    const fromKey = 'from';
    if (cmd.hasOwnProperty(fromKey)) {
        cmd[fromKey] = toTable(cmd[fromKey]);
    }

    return cmd;
}

function processDeleteArgs(cmd) {
    return toArgsArray(cmd);
}

function toArgsArray(cmd) {
    if(!Array.isArray(cmd)) {
        cmd = [cmd];
    }
    return cmd;
}

function toTable(name) {
    if (typeof name === 'string') {
        name = {'Table': name};
    }
    return name
}

function toId(name) {
    if (typeof name === 'string') {
        name = {'Id': name};
    }
    return name
}

module.exports = {
    Sliceup: Sliceup
};
