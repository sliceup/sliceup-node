const axios = require("axios");
const { QueryData } = require("./queryData.js");

/**
 * Creates a Sliceup client object.
 *
 * @param {string} ip            Connection ip address.
 * @param {string} [port='8080'] Connection port.
 */
const Sliceup = (ip, port) => {

    port =  typeof port !== "undefined" ? port : "8080";
    const host = `http://${ip}:${port}/`;

    const instance = {

        /**
         * Creates the table.
         *
         * Creates the table with the given parameters in the database.
         *
         * @param {object} config New table configuration.
         * @returns {Promise<object>}
         */

        create: (config) => postRequest(host, "create", config),

        /**
         * Summarizes the database.
         *
         * Summarizes the database configuration.
         *
         * @returns {Promise<object>}
         */
        summary: () => getRequest(host,"summary"),

        /**
         * Inserts the data.
         *
         * Inserts the given data into the database.
         *
         * @param {object} data New row data.
         * @returns {Promise<object>}
         */
        insert: (data) => postRequest(host,"insert", data),

        /**
         * Deletes the tables.
         *
         * Deletes the tables of given names.
         *
         * @param {Array|string} cmd Tables names.
         * @returns {Promise<object>}
         */
        delete: (cmd) => {
            cmd = processDeleteArgs(cmd);
            return postRequest(host,"delete", cmd);
        },

        /**
         * @param {string} name
         * @returns {Promise<object>}
         */
        describe: (name) => {
            return postRequest(host,"describe", {name});
        },

        /**
         * Queries the data.
         *
         * Queries the database using the given parameters.
         *
         * @param {object} cmd Query parameters.
         * @returns {Promise<QueryData>}
         */
        query: async (cmd) => {
            cmd = processQueryArgs(cmd);
            return QueryData(await postRequest(host,"query", cmd));
        }
    };

    // Host health check
    instance.summary().catch(error => console.error(error));

    return instance;
};

// Make requests

function getRequest(host, method, payload) {
    return handleRequestErrors(axios.get(host + method, payload));
}

function postRequest(host, method, payload) {
    return handleRequestErrors(axios.post(host + method, payload));
}

// Handle errors

function handleRequestErrors(response) {
    return response
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (!error.response) {
                throw new Error(error.message);
            } else {
                throw new Error(error.response.data.message);
            }
        });
}

// Args processing

function processQueryArgs(cmd) {
    const columnArgs = ["select", "where", "by"];
    for (const key of columnArgs) {
        // eslint-disable-next-line no-prototype-builtins
        if (cmd.hasOwnProperty(key)) {
            cmd[key] = toArgsArray(cmd[key]);
            for (let i = 0; i < cmd[key].length; i++) {
                cmd[key][i] = toId(cmd[key][i]);
            }
        }
    }

    const fromKey = "from";
    // eslint-disable-next-line no-prototype-builtins
    if (cmd.hasOwnProperty(fromKey)) {
        cmd[fromKey] = toTable(cmd[fromKey]);
    }

    return cmd;
}

function processDeleteArgs(cmd) {
    return toArgsArray(cmd);
}

function toArgsArray(cmd) {
    if (!Array.isArray(cmd)) {
        cmd = [cmd];
    }
    return cmd;
}

function toTable(name) {
    if (typeof name === "string") {
        name = { Table: name };
    }
    return name;
}

function toId(name) {
    if (typeof name === "string") {
        name = { Id: name };
    }
    return name;
}

module.exports = {
    Sliceup
};
