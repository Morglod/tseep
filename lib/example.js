"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var events = new index_1.EventEmitter();
events.on('foo', function (a, b) {
    console.log('foo:', a, b);
});
events.on('boo', function (a) {
    console.log('boo:', a);
});
events.emit('foo', 123, 'hello');
events.emit('boo', 'hello');
//# sourceMappingURL=example.js.map