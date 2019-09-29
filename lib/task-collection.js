"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function remove_norebuild(a, b /*, ...func: Func[] */) {
    // if (this.length === 0) return;
    // if (b) {
    //     let rest = [];
    //     for (var i = 0; i < arguments.length; i++) {
    //         rest[i] = arguments[i];
    //     }
    //     this.tasks = this.tasks.filter(x => !rest.includes(x));
    // }
    // else {
    //     if (this.length === 1) {
    //         if (this._tasks === a) {
    //             this.length = 0;
    //         }
    //     } else {
    //         _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
    //     }
    // }
}
function remove_rebuild(a, b /*, ...func: Func[] */) {
    // if (this.tasks.length === 0) return;
    // if (b) {
    //     let rest = [];
    //     for (var i = 0; i < arguments.length; i++) {
    //         rest[i] = arguments[i];
    //     }
    //     this.tasks = this.tasks.filter(x => !rest.includes(x));
    // } else {
    //     if (this.tasks.length === 1 && this.tasks[0] === a) {
    //         this.tasks = [];
    //     } else {
    //         _fast_remove_single(this.tasks, this.tasks.indexOf(a));
    //     }
    // }
    // if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    // else this.rebuild();
}
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
        (_b = this._tasks).splice.apply(_b, [index, 0].concat(func));
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
        (_b = this._tasks).splice.apply(_b, [index, 0].concat(func));
        this.length = this._tasks.length;
    }
    if (this.firstEmitBuildStrategy)
        this.call = rebuild_on_first_call;
    else
        this.rebuild();
}
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
        this.push = push_rebuild.bind(this);
        this.remove = remove_rebuild.bind(this);
        this.insert = insert_rebuild.bind(this);
        this.removeLast = removeLast_rebuild.bind(this);
    }
    else {
        this.push = push_norebuild.bind(this);
        this.remove = remove_norebuild.bind(this);
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
TaskCollection.prototype.fastClear = fastClear;
TaskCollection.prototype.clear = clear;
TaskCollection.prototype.growArgsNum = growArgsNum;
TaskCollection.prototype.setAutoRebuild = setAutoRebuild;
TaskCollection.prototype.tasksAsArray = tasksAsArray;
//# sourceMappingURL=task-collection.js.map