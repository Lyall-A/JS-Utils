const defaultMethods = ["GET", "HEAD", "POST", "PUT", "DELETE"];

module.exports = class {
    constructor(options = { }) {
        this.listeners = [];
        
        this.addMethod();
        (options.methods || defaultMethods).forEach(method => this.addMethod(method));
    }

    route = (req, res) => {
        const path = req.url.split("?")[0].split("/").filter(i=>i);
        const params = { };

        const filteredListeners = this.listeners.filter(listener => {
            if (!(req.method == listener.method || !listener.method)) return false; // If method matches or if no method was specified

            if (!listener.path) return true; // If no listener path specified

            const listenerPath = listener.path.split("/").filter(i=>i);

            if (!listenerPath.length) {
                if (!path.length) return true; // If no listener path and path (both are /)
                return false; // If no listener path but path
            }

            if (listenerPath.length < path.length && !(listener.path.endsWith("/*") || listenerPath.join() == "*")) return false; // If listener path does not match path length and listener path does not end with *
            if (listenerPath.length > path.length && listenerPath.join() != "*") return false; // If listener path length is more than path length
            
            // For each listener path
            let match = true;
            listenerPath.forEach((singleListenerPath, index) => {
                if (!match) return;
                if (singleListenerPath.startsWith(":")) {
                    // Parameter
                    params[singleListenerPath.substring(1)] = path[index];
                } else if (singleListenerPath == "*") {
                    // Anything
                } else {
                    // Normal
                    if (singleListenerPath != path[index]) match = false; // Exact match
                }
            });
            return match ? true : false; // If match
        });

        (function callListener(index) {
            const listener = filteredListeners[index];
            if (!listener) return;
            listener.callback(req, res, () => callListener(index+1), params);
        })(0);
    }

    addMethod(method) {
        const upperCase = method?.toUpperCase();
        const lowerCase = method?.toLowerCase();

        this[lowerCase || "use"] = (path, callback) => {
            if (typeof path == "function" && !callback) {
                callback = path;
                path = undefined;
            }

            this.listeners.push({
                method: upperCase,
                path,
                callback
            });
        }
    }
}