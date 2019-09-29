"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var events = new index_1.EventEmitter();
var f1 = function (a, b) {
    console.log('foo:', a, b);
};
var f2 = function (a, b) {
    console.log('foo:', a, b);
};
var f3 = function (a, b) {
    console.log('foo:', a, b);
};
events.on('foo', f1);
events.on('foo', f2);
events.on('foo', f3);
events.once('boo', function (a) {
    console.log('boo:', a);
});
// events.emit('foo', 123, 'hello');
// events.emit('boo', 'hello');
events.off('foo', f3);
events.off('foo', f2);
events.off('foo', f1);
console.log(events);
console.log(events.listeners('foo'));
//# sourceMappingURL=example.js.map