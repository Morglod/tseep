"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inliner_1 = require("./inliner");
var EMPTY_FUNC = (function () { });
function bakeCollection(collection, fixedArgsNum) {
    if (collection.length === 0)
        return EMPTY_FUNC;
    else if (collection.length === 1)
        return collection[0];
    var funcFactoryCode;
    {
        var argsDefCode_1 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_1 + ")"; }).join('\n');
        funcFactoryCode = "(function() {\n            " + funcDefCode + "\n            return (function(" + argsDefCode_1 + ") {\n                " + funcCallCode + "\n            });\n        })";
    }
    // isolate eval
    var bakeCollection = undefined;
    var funcFactory = eval(funcFactoryCode);
    return funcFactory();
}
exports.bakeCollection = bakeCollection;
function bakeCollectionAwait(collection, fixedArgsNum) {
    if (collection.length === 0)
        return EMPTY_FUNC;
    else if (collection.length === 1)
        return collection[0];
    var funcFactoryCode;
    {
        var argsDefCode_2 = Array.from({ length: fixedArgsNum }).map(function (_, i) { return "arg" + i; }).join(', ');
        var funcDefCode = collection.map(function (_, i) { return "var f" + i + " = collection[" + i + "];"; }).join('\n');
        var funcCallCode = collection.map(function (_, i) { return "f" + i + "(" + argsDefCode_2 + ")"; }).join(', ');
        funcFactoryCode = "(function() {\n            " + funcDefCode + "\n            return (function(" + argsDefCode_2 + ") {\n                return Promise.all([ " + funcCallCode + " ]);\n            });\n        })";
    }
    // isolate eval
    var bakeCollection = undefined;
    var funcFactory = eval(funcFactoryCode);
    return funcFactory();
}
exports.bakeCollectionAwait = bakeCollectionAwait;
function push_norebuild__tasks_array(a, b /*, ...func: Func[] */) {
    if (b) { // if multiple args
        var _a;
        (_a = this._tasks).push.apply(_a, arguments);
        this.length += arguments.length;
    }
    else { // if single arg (most often case)
        this._tasks.push(a);
        this.length++;
    }
}
function push_norebuild__tasks_single(a, b /*, ...func: Func[] */) {
    if (b) { // if multiple args
        var newAr = Array(1 + arguments.length);
        newAr.push(newAr);
        newAr.push.apply(newAr, arguments);
        this._tasks = newAr;
        this.length += arguments.length;
    }
    else { // if single arg (most often case)
        this._tasks = [this._tasks, a];
        this.length++;
    }
    this.push = push_norebuild__tasks_array;
}
function push_norebuild__tasks_null(a, b /*, ...func: Func[] */) {
    if (b) { // if multiple args
        var newAr = Array(arguments.length);
        newAr.push.apply(newAr, arguments);
        this._tasks = newAr;
        this.length += arguments.length;
    }
    else { // if single arg (most often case)
        this._tasks = a;
        this.length++;
    }
    this.push = push_norebuild__tasks_single;
}
var push_rebuild__tasks_array = function push_rebuild__tasks_array(a, b /*, ...func: Func[] */) {
    push_norebuild__tasks_array;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
push_rebuild__tasks_array = eval(inliner_1._unsafe_inliner(push_rebuild__tasks_array, [push_norebuild__tasks_array], 'def'));
var push_rebuild__tasks_single = function push_rebuild__tasks_single(a, b /*, ...func: Func[] */) {
    push_norebuild__tasks_single;
    this.push = push_rebuild__tasks_array;
    this.removeLast = removeLast_rebuild__array;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
push_rebuild__tasks_single = eval(inliner_1._unsafe_inliner(push_rebuild__tasks_single, [push_norebuild__tasks_single], 'def'));
var push_rebuild__tasks_null = function push_rebuild__tasks_null(a, b /*, ...func: Func[] */) {
    push_norebuild__tasks_null;
    this.push = push_rebuild__tasks_single;
    this.removeLast = removeLast_rebuild__single;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
push_rebuild__tasks_null = eval(inliner_1._unsafe_inliner(push_rebuild__tasks_null, [push_norebuild__tasks_null], 'def'));
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
function removeLast_norebuild__array(a) {
    _fast_remove_single(this._tasks, this._tasks.lastIndexOf(a));
    if (this._tasks.length === 1) {
        this._tasks = this._tasks[0];
        this.length = 1;
        this.removeLast = removeLast_rebuild__single;
        this.push = push_rebuild__tasks_single;
    }
    else
        this.length = this._tasks.length;
}
function removeLast_norebuild__single(a) {
    if (this._tasks === a) {
        this.length = 0;
        this.removeLast = removeLast_rebuild__null;
        this.push = push_rebuild__tasks_null;
    }
}
function removeLast_norebuild__null(a) {
}
var removeLast_rebuild__array = function removeLast_rebuild__array(a) {
    removeLast_norebuild__array;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
removeLast_rebuild__array = eval(inliner_1._unsafe_inliner(removeLast_rebuild__array, [removeLast_norebuild__array], 'def'));
var removeLast_rebuild__single = function removeLast_rebuild__single(a) {
    removeLast_norebuild__single;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
removeLast_rebuild__single = eval(inliner_1._unsafe_inliner(removeLast_rebuild__single, [removeLast_norebuild__single], 'def'));
var removeLast_rebuild__null = function removeLast_rebuild__null(a) {
    removeLast_norebuild__null;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
};
removeLast_rebuild__null = eval(inliner_1._unsafe_inliner(removeLast_rebuild__null, [removeLast_norebuild__null], 'def'));
function insert_norebuild(index) {
    var _b;
    var func = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        func[_i - 1] = arguments[_i];
    }
    if (this.length === 0) {
        this._tasks = func;
        this.length = 1;
    }
    else if (this.length === 1) {
        func.unshift(this._tasks);
        this._tasks = func;
        this.length = this._tasks.length;
    }
    else {
        (_b = this._tasks).splice.apply(_b, [index, 0].concat(func));
        this.length = this._tasks.length;
    }
}
function insert_rebuild(index) {
    var func = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        func[_i - 1] = arguments[_i];
    }
    insert_norebuild;
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
}
inliner_1._unsafe_inliner(insert_rebuild, [insert_norebuild], 'def');
function rebuild_noawait() {
    if (this.length === 0)
        this.call = EMPTY_FUNC;
    else if (this.length === 1)
        this.call = this._tasks;
    else
        this.call = bakeCollection(this._tasks, this.argsNum);
}
function rebuild_await() {
    if (this.length === 0)
        this.call = EMPTY_FUNC;
    else if (this.length === 1)
        this.call = this._tasks;
    else
        this.call = bakeCollectionAwait(this._tasks, this.argsNum);
}
function rebuild_on_first_call() {
    this.rebuild();
    this.call.apply(undefined, arguments);
}
var TaskCollection = /** @class */ (function () {
    function TaskCollection(argsNum, autoRebuild, initialTasks, awaitTasks) {
        if (autoRebuild === void 0) { autoRebuild = true; }
        if (initialTasks === void 0) { initialTasks = null; }
        if (awaitTasks === void 0) { awaitTasks = false; }
        this.awaitTasks = awaitTasks;
        this.call = EMPTY_FUNC;
        this.argsNum = argsNum;
        this.firstEmitBuildStrategy = true;
        if (awaitTasks)
            this.rebuild = rebuild_await.bind(this);
        else
            this.rebuild = rebuild_noawait.bind(this);
        if (initialTasks) {
            if (typeof initialTasks === 'function') {
                this._tasks = initialTasks;
                this.length = 1;
            }
            else {
                this._tasks = initialTasks;
                this.length = initialTasks.length;
            }
        }
        else {
            this._tasks = null;
            this.length = 0;
        }
        this.setAutoRebuild(autoRebuild);
        if (autoRebuild)
            this.rebuild();
    }
    return TaskCollection;
}());
exports.TaskCollection = TaskCollection;
function fastClear() {
    this._tasks = null;
    this.length = 0;
    this.call = EMPTY_FUNC;
}
function clear() {
    this._tasks = null;
    this.length = 0;
    this.call = EMPTY_FUNC;
}
function growArgsNum(argsNum) {
    if (this.argsNum < argsNum) {
        this.argsNum = argsNum;
        if (this.firstEmitBuildStrategy)
            this.call = rebuild_on_first_call;
        else
            this.rebuild();
    }
}
function setAutoRebuild(newVal) {
    if (newVal) {
        if (this.length === 0) {
            this.push = push_rebuild__tasks_null.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__null.bind(this);
        }
        else if (this.length === 1) {
            this.push = push_rebuild__tasks_single.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__single.bind(this);
        }
        else {
            this.push = push_rebuild__tasks_array.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__array.bind(this);
        }
    }
    else {
        if (this.length === 0) {
            this.push = push_norebuild__tasks_null.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__null.bind(this);
        }
        else if (this.length === 1) {
            this.push = push_norebuild__tasks_single.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__single.bind(this);
        }
        else {
            this.push = push_norebuild__tasks_array.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__array.bind(this);
        }
    }
}
;
function tasksAsArray() {
    if (this.length === 0)
        return [];
    if (this.length === 1)
        return [this._tasks];
    return this._tasks;
}
function setTasks(tasks) {
    if (tasks.length === 0) {
        this.length = 0;
        this.call = EMPTY_FUNC;
    }
    else if (tasks.length === 1) {
        this.length = 1;
        this.call = tasks[0];
        this._tasks = tasks[0];
    }
    else {
        this.length = tasks.length;
        this._tasks = tasks;
        if (this.firstEmitBuildStrategy)
            this.call = rebuild_on_first_call;
        else
            this.rebuild();
    }
}
TaskCollection.prototype.fastClear = fastClear;
TaskCollection.prototype.clear = clear;
TaskCollection.prototype.growArgsNum = growArgsNum;
TaskCollection.prototype.setAutoRebuild = setAutoRebuild;
TaskCollection.prototype.tasksAsArray = tasksAsArray;
TaskCollection.prototype.setTasks = setTasks;
//# sourceMappingURL=task-collection_inliner.js.map