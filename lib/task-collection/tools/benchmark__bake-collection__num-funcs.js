"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bake_collection_1 = require("../bake-collection");
var steps = [10, 100, 500, 1000, 1500, 2000, 3000, 4000, 5000, 10000];
var callTimes = 20;
function makeFuncsArray(size) {
    var a = Array(size);
    for (var i = 0; i < size; ++i) {
        a[i] = eval("\n            (function (x, y) {\n                let zx = 11;\n                for (let j = 0; j < 10; ++j) {\n                    zx += j + x * y + ".concat((Math.random() * 100).toFixed(0), ";\n                }\n                return zx;\n            })\n        "));
    }
    return a;
}
// -----------------
// Warm up memory
var predefined_funcs = makeFuncsArray(steps[steps.length - 1]);
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
    console.log("funcs num\t| bake time \t| first call time\t| call time\t| heap change\t| total time\n");
    var _loop_1 = function (stepi) {
        // global.gc();
        var funcs = predefined_funcs.slice(0, steps[stepi]);
        var bakeStart = process.hrtime();
        var baked = function (x, y) {
            for (var jj = 0; jj < funcs.length; ++jj) {
                funcs[jj](x, y);
            }
        };
        var bakeTime = process.hrtime(bakeStart);
        // global.gc();
        var firstCallStart = process.hrtime();
        baked(10, 5);
        var firstCallTime = process.hrtime(firstCallStart);
        baked(10, 5);
        var callStart = process.hrtime();
        for (var i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        var callTime = process.hrtime(callStart);
        var totalTime = (bakeTime[1] / 1000000) + (callTime[1] / 1000000);
        console.log("".concat(steps[stepi], "\t\t| ").concat(bakeTime[1] / 1000000, " ms\t| ").concat(firstCallTime[1] / 1000000, " ms\t\t| ").concat(callTime[1] / 1000000, " ms\t| ").concat((nextHeapUsed() / 1024 / 1024).toFixed(3), " mb\t|").concat(totalTime, "ms"));
    };
    for (var stepi = 0; stepi < steps.length; stepi++) {
        _loop_1(stepi);
    }
}
function benchBake() {
    console.log('\nbakeCollection:');
    console.log("funcs num\t| bake time \t| first call time\t| call time\t| heap change\t| total time\n");
    for (var stepi = 0; stepi < steps.length; stepi++) {
        // global.gc();
        var funcs = predefined_funcs.slice(0, steps[stepi]);
        var bakeStart = process.hrtime();
        var baked = (0, bake_collection_1.bakeCollection)(funcs, 2);
        var bakeTime = process.hrtime(bakeStart);
        // global.gc();
        var firstCallStart = process.hrtime();
        baked(10, 5);
        var firstCallTime = process.hrtime(firstCallStart);
        baked(10, 5);
        var callStart = process.hrtime();
        for (var i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        var callTime = process.hrtime(callStart);
        var totalTime = (bakeTime[1] / 1000000) + (callTime[1] / 1000000);
        console.log("".concat(steps[stepi], "\t\t| ").concat(bakeTime[1] / 1000000, " ms\t| ").concat(firstCallTime[1] / 1000000, " ms\t\t| ").concat(callTime[1] / 1000000, " ms\t| ").concat((nextHeapUsed() / 1024 / 1024).toFixed(3), " mb\t|").concat(totalTime, "ms"));
    }
}
// global.gc();
benchForI();
// global.gc();
benchBake();
//# sourceMappingURL=benchmark__bake-collection__num-funcs.js.map