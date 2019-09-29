"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tseep = __importStar(require("./"));
var ee = new tseep.EventEmitter();
function handler(a, b, c) {
    if (arguments.length > 10)
        throw new Error('aaa');
}
for (var i = 0; i < 9999999999; ++i) {
    for (var j = 0; j < 99999; ++j) {
        ee.on('foo', handler);
    }
    for (var j = 0; j < 99999; ++j) {
        ee.off('foo', handler);
    }
}
console.log('ok');
//# sourceMappingURL=opt-playground.js.map