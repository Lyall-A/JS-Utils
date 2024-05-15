const parseQuery = require("./parseQuery");

module.exports = string => {
    const splits = {
        "://": string.split("://"),
        ":": string.split(":"),
        "/": string.split("/"),
        "?": string.split("?")
    }

    // protocol
    const protocol = splits["://"][1] ? splits["://"][0].toLowerCase() : null;

    // port
    const port = parseInt(splits[":"][protocol ? 2 : 1]?.split("/")[0]) || null;

    // host
    const host =
        protocol ?
            splits["://"][1].split(port ? ":" : "/")[0].toLowerCase() :
            (port ? splits[":"] : splits["/"])[0].toLowerCase() ||
            null;

    // full path
    const fullPath = "/" + splits["/"].slice(protocol ? 3 : 1).join("/");

    // path
    const path = fullPath.split("?")[0];

    // query
    const query = parseQuery(fullPath);

    return {
        protocol,
        host,
        port,
        fullPath,
        path,
        query
    };
}