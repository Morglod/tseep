"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._fast_remove_single = void 0;
function _fast_remove_single(arr, index) {
    if (index === -1)
        return;
    if (index === 0)
        arr.shift();
    else if (index === arr.length - 1)
        arr.length = arr.length - 1;
    else
        arr.splice(index, 1);
}
exports._fast_remove_single = _fast_remove_single;
//# sourceMappingURL=utils.js.map