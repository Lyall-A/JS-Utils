const http = require("http");
const https = require("https");

module.exports = class {
    constructor(options = { }, serverOptions = { }) {
        this.server = (options.ssl ? https : http).createServer(serverOptions);

        if (options.route) this.server.on("request", options.route);
        if (options.listen) this.server.listen(options.listen, options.listenCallback);

        this.on = (...args) => this.server.on(...args);
        this.once = (...args) => this.server.once(...args);
        this.listen = (...args) => this.server.listen(...args);
    }
}