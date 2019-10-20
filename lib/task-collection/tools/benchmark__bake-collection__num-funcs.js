"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bake_collection_1 = require("../bake-collection");
var steps = [10, 100, 500, 1000, 10000, 15000, 25000, 35000, 50000];
var callTimes = 20;
function makeFuncsArray(size) {
    var a = Array(size);
    for (var i = 0; i < size; ++i) {
        a[i] = eval("\n            (function (x, y) {\n                let zx = 11;\n                for (let j = 0; j < 10; ++j) {\n                    zx += j + x * y + " + (Math.random() * 100).toFixed(0) + ";\n                }\n                return zx;\n            })\n        ");
    }
    return a;
}
// -----------------
// Warm up memory
makeFuncsArray(steps[steps.length - 1]);
var _prevHeapUsed = process.memoryUsage().heapUsed;
function nextHeapUsed() {
    var cur = process.memoryUsage().heapUsed;
    var x = cur - _prevHeapUsed;
    _prevHeapUsed = cur;
    return x;
}
// -----------------
function benchForI() {
    console.log('\narray, forI loop:');
    console.log("funcs num\t| bake time \t| first call time\t| call time\t| heap change\n");
    var _loop_1 = function (stepi) {
        var funcs = makeFuncsArray(steps[stepi]);
        var bakeStart = process.hrtime();
        var baked = function (x, y) {
            for (var jj = 0; jj < funcs.length; ++jj) {
                funcs[jj](x, y);
            }
        };
        var bakeEnd = process.hrtime(bakeStart);
        var firstCallStart = process.hrtime();
        baked(10, 5);
        var firstCallEnd = process.hrtime(firstCallStart);
        baked(10, 5);
        var callStart = process.hrtime();
        for (var i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        var callEnd = process.hrtime(callStart);
        console.log(steps[stepi] + "\t\t| " + bakeEnd[1] / 1000000 + " ms\t| " + firstCallEnd[1] / 1000000 + " ms\t\t| " + callEnd[1] / 1000000 + " ms\t| " + (nextHeapUsed() / 1024 / 1024).toFixed(3) + " mb");
    };
    for (var stepi = 0; stepi < steps.length; stepi++) {
        _loop_1(stepi);
    }
}
function benchBake() {
    console.log('\nbakeCollection:');
    console.log("funcs num\t| bake time \t| first call time\t| call time\t| heap change\n");
    for (var stepi = 0; stepi < steps.length; stepi++) {
        var funcs = makeFuncsArray(steps[stepi]);
        var bakeStart = process.hrtime();
        var baked = bake_collection_1.bakeCollection(funcs, 2);
        var bakeEnd = process.hrtime(bakeStart);
        var firstCallStart = process.hrtime();
        baked(10, 5);
        var firstCallEnd = process.hrtime(firstCallStart);
        baked(10, 5);
        var callStart = process.hrtime();
        for (var i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        var callEnd = process.hrtime(callStart);
        console.log(steps[stepi] + "\t\t| " + bakeEnd[1] / 1000000 + " ms\t| " + firstCallEnd[1] / 1000000 + " ms\t\t| " + callEnd[1] / 1000000 + " ms\t| " + (nextHeapUsed() / 1024 / 1024).toFixed(3) + " mb");
    }
}
benchForI();
benchBake();
//# sourceMappingURL=benchmark__bake-collection__num-funcs.js.map