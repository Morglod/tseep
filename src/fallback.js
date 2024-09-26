try {
    eval('(1+2)');
    module.exports = require('./ee');
} catch {
    module.exports = require('./ee-safe');
}
