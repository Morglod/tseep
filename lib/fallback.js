try {
    eval('(1+2)');
    module.exports = require('./ee');
}
catch (_a) {
    module.exports = require('./ee-safe');
}
//# sourceMappingURL=fallback.js.map