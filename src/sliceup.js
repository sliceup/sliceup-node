const axios = require("axios");
const { QueryData } = require("./queryData.js");
const { fixUrl, processDeleteArgs, processQueryArgs } = require("./helpers");

/**
 * Creates a Sliceup client object.
 *
 * @param {string} host          Connection host.
 */
const Sliceup = host => {
    host = fixUrl(host);

    const instance = {
        /**
         * Creates the table.
         *
         * Creates the table with the given parameters in the database.
         *
         * @param {object} config New table configuration.
         * @returns {Promise<object>}
         */

        create: config => postRequest(host, "create", config),

        /**
         * Summarizes the database.
         *
         * Summarizes the database configuration.
         *
         * @returns {Promise<object>}
         */
        summary: () => getRequest(host, "summary"),

        /**
         * Inserts the data.
         *
         * Inserts the given data into the database.
         *
         * @param {object} data New row data.
         * @returns {Promise<object>}
         */
        insert: data => postRequest(host, "insert", data),

        /**
         * Deletes the tables.
         *
         * Deletes the tables of given names.
         *
         * @param {Array|string} cmd Tables names.
         * @returns {Promise<object>}
         */
        delete: cmd => {
            cmd = processDeleteArgs(cmd);
            return postRequest(host, "delete", cmd);
        },

        /**
         * @param {string} name
         * @returns {Promise<object>}
         */
        describe: name => {
            return postRequest(host, "describe", { name });
        },

        /**
         * Queries the data.
         *
         * Queries the database using the given parameters.
         *
         * @param {object} cmd Query parameters.
         * @returns {Promise<QueryData>}
         */
        query: async cmd => {
            cmd = processQueryArgs(cmd);
            return QueryData(await postRequest(host, "query", cmd));
        }
    };

    // Host health check
    instance.summary().catch(error => console.error(error));

    return instance;
};

// Make requests

const getRequest = (host, method, payload) => {
    return handleRequestErrors(axios.get(host + method, payload));
};

const postRequest = (host, method, payload) => {
    return handleRequestErrors(axios.post(host + method, payload));
};

// Handle errors

const handleRequestErrors = response => {
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
};

module.exports = {
    Sliceup
};
