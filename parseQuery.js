module.exports = string => {
    const queryString = string.split("?")[1] || string;
    if (!queryString) return { };
    return Object.fromEntries(queryString.split("&").map(i => i.split("=")));
}