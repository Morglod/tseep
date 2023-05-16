"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollection = exports._fast_remove_single = void 0;
var bake_collection_1 = require("./bake-collection");
function push_norebuild(a, b /*, ...func: Func[] */) {
    var len = this.length;
    if (len > 1) { // tasks is array
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
    else { // tasks is (function or null)
        if (b) { // if multiple args
            if (len === 1) { // if this._tasks is function
                var newAr = Array(1 + arguments.length);
                newAr.push(newAr);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            else {
                var newAr = Array(arguments.length);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            this.length += arguments.length;
        }
        else { // if single arg (most often case)
            if (len === 1)
                this._tasks = [this._tasks, a];
            else
                this._tasks = a;
            this.length++;
        }
    }
}
function push_rebuild(a, b /*, ...func: Func[] */) {
    var len = this.length;
    if (len > 1) { // tasks is array
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
    else { // tasks is (function or null)
        if (b) { // if multiple args
            if (len === 1) { // if this._tasks is function
                var newAr = Array(1 + arguments.length);
                newAr.push(newAr);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            else {
                var newAr = Array(arguments.length);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            this.length += arguments.length;
        }
        else { // if single arg (most often case)
            if (len === 1)
                this._tasks = [this._tasks, a];
            else
                this._tasks = a;
            this.length++;
        }
    }
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
}
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
function removeLast_norebuild(a) {
    if (this.length === 0)
        return;
    if (this.length === 1) {
        if (this._tasks === a) {
            this.length = 0;
        }
    }
    else {
        _fast_remove_single(this._tasks, this._tasks.lastIndexOf(a));
        if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
        }
        else
            this.length = this._tasks.length;
    }
}
function removeLast_rebuild(a) {
    if (this.length === 0)
        return;
    if (this.length === 1) {
        if (this._tasks === a) {
            this.length = 0;
        }
        if (this.firstEmitBuildStrategy) {
            this.call = bake_collection_1.BAKED_EMPTY_FUNC;
            return;
        }
        else {
            this.rebuild();
            return;
        }
    }
    else {
        _fast_remove_single(this._tasks, this._tasks.lastIndexOf(a));
        if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
        }
        else
            this.length = this._tasks.length;
    }
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
}
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
        (_b = this._tasks).splice.apply(_b, __spreadArray([index, 0], func, false));
        this.length = this._tasks.length;
    }
}
function insert_rebuild(index) {
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
        (_b = this._tasks).splice.apply(_b, __spreadArray([index, 0], func, false));
        this.length = this._tasks.length;
    }
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
}
function rebuild_noawait() {
    if (this.length === 0)
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
    else if (this.length === 1)
        this.call = this._tasks;
    else
        this.call = (0, bake_collection_1.bakeCollection)(this._tasks, this.argsNum);
}
function rebuild_await() {
    if (this.length === 0)
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
    else if (this.length === 1)
        this.call = this._tasks;
    else
        this.call = (0, bake_collection_1.bakeCollectionAwait)(this._tasks, this.argsNum);
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
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
        this.argsNum = argsNum;
        this.firstEmitBuildStrategy = true;
        if (awaitTasks)
            this.rebuild = rebuild_await.bind(this);
        else
            this.rebuild = rebuild_noawait.bind(this);
        this.setAutoRebuild(autoRebuild);
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
        if (autoRebuild)
            this.rebuild();
    }
    return TaskCollection;
}());
exports.TaskCollection = TaskCollection;
function fastClear() {
    this._tasks = null;
    this.length = 0;
    this.call = bake_collection_1.BAKED_EMPTY_FUNC;
}
function clear() {
    this._tasks = null;
    this.length = 0;
    this.call = bake_collection_1.BAKED_EMPTY_FUNC;
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
        this.push = push_rebuild.bind(this);
        this.insert = insert_rebuild.bind(this);
        this.removeLast = removeLast_rebuild.bind(this);
    }
    else {
        this.push = push_norebuild.bind(this);
        this.insert = insert_norebuild.bind(this);
        this.removeLast = removeLast_norebuild.bind(this);
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
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
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
//# sourceMappingURL=task-collection.js.map