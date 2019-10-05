const f = require("./functions.js");

// Args processing

const processQueryArgs = cmd => {
    const columnArgs = ["select", "where", "by"];
    for (const key of columnArgs) {
        if (!hasProperty(cmd, key)) {
            continue;
        }

        cmd[key] = toArgsArray(cmd[key]);
        for (let i = 0; i < cmd[key].length; i++) {
            cmd[key][i] = toId(cmd[key][i]);
        }
    }

    const fromKey = "from";
    if (hasProperty(cmd, fromKey)) {
        cmd[fromKey] = toTable(cmd[fromKey]);
    }

    return cmd;
};

const processDeleteArgs = cmd => toArgsArray(cmd);

const toArgsArray = cmd => {
    if (!Array.isArray(cmd)) {
        cmd = [cmd];
    }
    return cmd;
};

const toTable = name => {
    if (typeof name === "string") {
        name = { Table: name };
    }
    return name;
};

const toId = name => {
    if (typeof name === "string") {
        name = { Id: name };
    }
    return name;
};

const hasProperty = (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

// Validators

function isBool(arg) {
    return typeof arg === "boolean";
}

function isInt(arg) {
    return Number.isInteger(arg);
}

function isFloat(arg) {
    return Number(arg) === arg && arg % 1 !== 0;
}

function isString(arg) {
    return typeof arg === "string";
}

module.exports = {
    processQueryArgs,
    processDeleteArgs,
    isBool,
    isInt,
    isFloat,
    isString
};
