"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAll = exports.patchEvents = exports.patchEE3 = void 0;
var ee_1 = require("./ee");
function patchEE3() {
    try {
        var ee3 = require('eventemitter3');
        if (ee3) {
            ee3.EventEmitter = ee_1.EventEmitter;
        }
    }
    catch (err) {
        console.error(err);
    }
}
exports.patchEE3 = patchEE3;
function patchEvents() {
    try {
        var ee = require('events');
        if (ee) {
            ee.EventEmitter = ee_1.EventEmitter;
        }
    }
    catch (err) {
        console.error(err);
    }
}
exports.patchEvents = patchEvents;
function patchAll() {
    patchEE3();
    patchEvents();
}
exports.patchAll = patchAll;
//# sourceMappingURL=patch.js.map