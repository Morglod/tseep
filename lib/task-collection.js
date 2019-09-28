"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EMPTY_FUNC = function () { };
function bakeCollection(collection, fixedArgsNum) {
    if (collection.length === 0)
        return EMPTY_FUNC;
    var funcFactoryCode;
    {
        var argsDefCode_1 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var argsGetCode = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "var arg" + i + " = args[" + i + "]"; }).join(';\n');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_1 + ")"; }).join('\n');
        funcFactoryCode = "(function() {\n            " + funcDefCode + "\n            return (function(args) {\n                " + argsGetCode + "\n                " + funcCallCode + "\n            });\n        })";
    }
    // isolate eval
    var bakeCollection = undefined;
    var funcFactory = eval(funcFactoryCode);
    return funcFactory();
}
exports.bakeCollection = bakeCollection;
function bakeCollectionAwait(collection, fixedArgsNum) {
    var funcFactoryCode;
    {
        var argsDefCode_2 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var argsGetCode = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i + " = args[" + i + "]"; }).join(';\n');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_2 + ")"; }).join(', ');
        funcFactoryCode = "(function() {\n            " + funcDefCode + "\n            return (function(args) {\n                " + argsGetCode + "\n                return Promise.all([ " + funcCallCode + " ]);\n            });\n        })";
    }
    // isolate eval
    var bakeCollection = undefined;
    var funcFactory = eval(funcFactoryCode);
    return funcFactory();
}
exports.bakeCollectionAwait = bakeCollectionAwait;
function push_norebuild() {
    var _a;
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    (_a = this._tasks).push.apply(_a, func);
}
function push_rebuild() {
    var _a;
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    (_a = this._tasks).push.apply(_a, func);
    this.rebuild();
}
function remove_norebuild() {
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    this._tasks = this._tasks.filter(function (x) { return func.includes(x); });
}
function remove_rebuild() {
    var func = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        func[_i] = arguments[_i];
    }
    this._tasks = this._tasks.filter(function (x) { return func.includes(x); });
    this.rebuild();
}
function insert_norebuild(index) {
    var _a;
    var func = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        func[_i - 1] = arguments[_i];
    }
    (_a = this._tasks).splice.apply(_a, [index, 0].concat(func));
}
function insert_rebuild(index) {
    var _a;
    var func = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        func[_i - 1] = arguments[_i];
    }
    (_a = this._tasks).splice.apply(_a, [index, 0].concat(func));
    this.rebuild();
}
function rebuild_noawait() {
    if (this.length === 0)
        this.call = EMPTY_FUNC;
    else
        this.call = bakeCollection(this._tasks, this.argsNum);
}
function rebuild_await() {
    if (this.length === 0)
        this.call = EMPTY_FUNC;
    else
        this.call = bakeCollectionAwait(this._tasks, this.argsNum);
}
var TaskCollection = /** @class */ (function () {
    function TaskCollection(argsNum, autoRebuild, awaitTasks) {
        var _this = this;
        if (autoRebuild === void 0) { autoRebuild = true; }
        if (awaitTasks === void 0) { awaitTasks = false; }
        this.awaitTasks = awaitTasks;
        this._tasks = [];
        this._autoRebuild = false;
        this.call = EMPTY_FUNC;
        /** this autorebuilds */
        this.clear = function () {
            _this._tasks.splice(0, _this._tasks.length);
            _this.rebuild();
        };
        this.argsNum = argsNum;
        if (awaitTasks)
            this.rebuild = rebuild_await.bind(this);
        else
            this.rebuild = rebuild_noawait.bind(this);
        this.autoRebuild = autoRebuild;
    }
    Object.defineProperty(TaskCollection.prototype, "tasks", {
        get: function () {
            return this._tasks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskCollection.prototype, "length", {
        get: function () {
            return this._tasks.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskCollection.prototype, "autoRebuild", {
        get: function () { return this._autoRebuild; },
        set: function (newVal) {
            if (newVal) {
                this.push = push_rebuild.bind(this);
                this.remove = remove_rebuild.bind(this);
                this.insert = insert_rebuild.bind(this);
            }
            else {
                this.push = push_norebuild.bind(this);
                this.remove = remove_norebuild.bind(this);
                this.insert = insert_norebuild.bind(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return TaskCollection;
}());
exports.TaskCollection = TaskCollection;
//# sourceMappingURL=task-collection.js.map