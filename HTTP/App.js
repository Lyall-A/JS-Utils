const Router = require("./Router");
const Server = require("./Server");

module.exports = class {
    constructor() {
        this.router = new Router();
        this.server = new Server({ route: this.router.route });

        this.on = (...args) => this.server.on(...args);
        this.once = (...args) => this.server.once(...args);
    
        this.listen = (...args) => this.server.listen(...args);
    
        this.use = (...args) => this.router.use(...parseServerObj(...args));
        this.get = (...args) => this.router.get(...parseServerObj(...args));
        this.head = (...args) => this.router.head(...parseServerObj(...args));
        this.post = (...args) => this.router.post(...parseServerObj(...args));
        this.put = (...args) => this.router.put(...parseServerObj(...args));
        this.delete = (...args) => this.router.delete(...parseServerObj(...args));
    }
}

function parseServerObj(req, res, ...args) {
    const newReq = { _raw: req };
    const newRes = { _raw: res };

    // TODO

    return [req, res, ...args];
}