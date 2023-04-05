"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BAKED_EMPTY_FUNC = (function () { });
var FORLOOP_FALLBACK = 6000;
function bakeCollection(collection, fixedArgsNum) {
    if (collection.length === 0)
        return exports.BAKED_EMPTY_FUNC;
    else if (collection.length === 1)
        return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
        var argsDefCode_1 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_1 + ")"; }).join('\n');
        funcFactoryCode = "(function(collection) {\n            " + funcDefCode + "\n            collection = undefined;\n            return (function(" + argsDefCode_1 + ") {\n                " + funcCallCode + "\n            });\n        })";
    }
    else {
        var argsDefCode = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        // loop unroll
        if (collection.length % 10 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(" + argsDefCode + ") {\n                    for (var i = 0; i < collection.length; i += 10) {\n                        collection[i](" + argsDefCode + ");\n                        collection[i+1](" + argsDefCode + ");\n                        collection[i+2](" + argsDefCode + ");\n                        collection[i+3](" + argsDefCode + ");\n                        collection[i+4](" + argsDefCode + ");\n                        collection[i+5](" + argsDefCode + ");\n                        collection[i+6](" + argsDefCode + ");\n                        collection[i+7](" + argsDefCode + ");\n                        collection[i+8](" + argsDefCode + ");\n                        collection[i+9](" + argsDefCode + ");\n                    }\n                });\n            })";
        }
        else if (collection.length % 4 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(" + argsDefCode + ") {\n                    for (var i = 0; i < collection.length; i += 4) {\n                        collection[i](" + argsDefCode + ");\n                        collection[i+1](" + argsDefCode + ");\n                        collection[i+2](" + argsDefCode + ");\n                        collection[i+3](" + argsDefCode + ");\n                    }\n                });\n            })";
        }
        else if (collection.length % 3 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(" + argsDefCode + ") {\n                    for (var i = 0; i < collection.length; i += 3) {\n                        collection[i](" + argsDefCode + ");\n                        collection[i+1](" + argsDefCode + ");\n                        collection[i+2](" + argsDefCode + ");\n                    }\n                });\n            })";
        }
        else {
            funcFactoryCode = "(function(collection) {\n                return (function(" + argsDefCode + ") {\n                    for (var i = 0; i < collection.length; ++i) {\n                        collection[i](" + argsDefCode + ");\n                    }\n                });\n            })";
        }
    }
    {
        // isolate
        var bakeCollection_1 = undefined;
        var fixedArgsNum_1 = undefined;
        var bakeCollectionVariadic_1 = undefined;
        var bakeCollectionAwait_1 = undefined;
        var funcFactory = eval(funcFactoryCode);
        return funcFactory(collection);
    }
}
exports.bakeCollection = bakeCollection;
function bakeCollectionAwait(collection, fixedArgsNum) {
    if (collection.length === 0)
        return exports.BAKED_EMPTY_FUNC;
    else if (collection.length === 1)
        return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
        var argsDefCode_2 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_2 + ")"; }).join(', ');
        funcFactoryCode = "(function(collection) {\n            " + funcDefCode + "\n            collection = undefined;\n            return (function(" + argsDefCode_2 + ") {\n                return Promise.all([ " + funcCallCode + " ]);\n            });\n        })";
    }
    else {
        var argsDefCode = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        funcFactoryCode = "(function(collection) {\n            return (function(" + argsDefCode + ") {\n                var promises = Array(collection.length);\n                for (var i = 0; i < collection.length; ++i) {\n                    promises[i] = collection[i](" + argsDefCode + ");\n                }\n                return Promise.all(promises);\n            });\n        })";
    }
    {
        // isolate
        var bakeCollection_2 = undefined;
        var collection_1 = undefined;
        var fixedArgsNum_2 = undefined;
        var bakeCollectionVariadic_2 = undefined;
        var bakeCollectionAwait_2 = undefined;
        var funcFactory = eval(funcFactoryCode);
        return funcFactory(collection_1);
    }
}
exports.bakeCollectionAwait = bakeCollectionAwait;
function bakeCollectionVariadic(collection) {
    if (collection.length === 0)
        return exports.BAKED_EMPTY_FUNC;
    else if (collection.length === 1)
        return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + ".apply(undefined, arguments)"; }).join('\n');
        funcFactoryCode = "(function(collection) {\n            " + funcDefCode + "\n            collection = undefined;\n            return (function() {\n                " + funcCallCode + "\n            });\n        })";
    }
    else {
        funcFactoryCode = "(function(collection) {\n            return (function() {\n                for (var i = 0; i < collection.length; ++i) {\n                    collection[i].apply(undefined, arguments);\n                }\n            });\n        })";
    }
    {
        // isolate
        var bakeCollection_3 = undefined;
        var collection_2 = undefined;
        var fixedArgsNum = undefined;
        var bakeCollectionVariadic_3 = undefined;
        var bakeCollectionAwait_3 = undefined;
        var funcFactory = eval(funcFactoryCode);
        return funcFactory(collection_2);
    }
}
exports.bakeCollectionVariadic = bakeCollectionVariadic;
//# sourceMappingURL=bake-collection.js.map