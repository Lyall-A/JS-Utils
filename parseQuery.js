function parseQuery(string) {
    const queryString = string.split("?")[1] || string;
    if (!queryString) return { };
    return Object.fromEntries(queryString.split("&").map(i => i.split("=")).filter(i => i[0]));
}

module.exports = parseQuery;