const path = require("path");

function load(file) {
    return require(path.resolve(__dirname, file));
}

const utils = {
    decToHex: load("decToHex.js"),
    escapeRegex: load("escapeRegex.js"),
    formatString: load("formatString.js"),
    objectDefaults: load("objectDefaults.js"),
    parseQuery: load("parseQuery.js"),
    parseUrl: load("parseUrl.js"),
}

module.exports = utils;