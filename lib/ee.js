"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_collection_1 = require("./task-collection");
function emit(event, a, b, c, d, e) {
    var ev = this.events[event];
    if (ev) {
        if (ev.length === 0)
            return false;
        if (ev.argsNum < 6) {
            ev.call(a, b, c, d, e);
        }
        else {
            ev.call.apply(undefined, arguments);
        }
        return true;
    }
    return false;
}
function emitHasOnce(event, a, b, c, d, e) {
    var ev = this.events[event];
    if (ev) {
        if (ev.length === 0)
            return false;
        if (ev.argsNum < 6) {
            ev.call(a, b, c, d, e);
        }
        else {
            ev.call.apply(undefined, arguments);
        }
    }
    var oev = this.onceEvents[event];
    if (oev) {
        if (oev.length === 0)
            return false;
        var fncs = oev;
        this.onceEvents[event] = [];
        if (arguments.length < 6) {
            for (var i = 0; i < fncs.length; ++i)
                fncs[i](a, b, c, d, e);
        }
        else {
            for (var i = 0; i < fncs.length; ++i)
                fncs[i].apply(undefined, arguments);
        }
        return true;
    }
    return !!ev;
}
/** Implemented event emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
        this.onceEvents = {};
        this._symbolKeys = new Set;
        this.maxListeners = Infinity;
    }
    Object.defineProperty(EventEmitter.prototype, "_eventsCount", {
        get: function () {
            return this.eventNames().length;
        },
        enumerable: true,
        configurable: true
    });
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
function once(event, listener) {
    if (this.emit === emit) {
        this.emit = emitHasOnce;
    }
    var evtmap = this.onceEvents[event];
    if (!evtmap || typeof evtmap !== 'object') {
        evtmap = this.onceEvents[event] = [listener];
        if (typeof event === 'symbol')
            this._symbolKeys.add(event);
    }
    else {
        evtmap.push(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn("Maximum event listeners for \"" + event + "\" once event!");
    }
    return this;
}
function addListener(event, listener, argsNum) {
    if (argsNum === void 0) { argsNum = listener.length; }
    if (typeof listener !== 'function')
        throw new TypeError('The listener must be a function');
    var evtmap = this.events[event];
    if (!evtmap || !(evtmap instanceof task_collection_1.TaskCollection)) {
        evtmap = this.events[event] = new task_collection_1.TaskCollection(argsNum, true, listener, false);
        if (typeof event === 'symbol')
            this._symbolKeys.add(event);
    }
    else {
        evtmap.push(listener);
        evtmap.growArgsNum(argsNum);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn("Maximum event listeners for \"" + event + "\" event!");
    }
    return this;
}
;
function removeListener(event, listener) {
    var evt = this.events[event];
    if (evt) {
        evt.removeLast(listener);
    }
    var evto = this.onceEvents[event];
    if (evto) {
        if (evto.length === 0)
            return;
        if (evto.length === 1 && evto[0] === listener) {
            this.onceEvents[event] = [];
        }
        else {
            task_collection_1._fast_remove_single(evto, evto.lastIndexOf(listener));
        }
    }
    return this;
}
;
function hasListeners(event) {
    return this.events[event] && !!this.events[event].length;
}
;
function prependListener(event, listener, argsNum) {
    if (argsNum === void 0) { argsNum = listener.length; }
    if (typeof listener !== 'function')
        throw new TypeError('The listener must be a function');
    var evtmap = this.events[event];
    if (!evtmap || !(evtmap instanceof task_collection_1.TaskCollection)) {
        evtmap = this.events[event] = new task_collection_1.TaskCollection(argsNum, true, listener, false);
        if (typeof event === 'symbol')
            this._symbolKeys.add(event);
    }
    else {
        evtmap.insert(0, listener);
        evtmap.growArgsNum(argsNum);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn("Maximum event listeners for \"" + event + "\" event!");
    }
    return this;
}
;
function prependOnceListener(event, listener) {
    if (this.emit === emit) {
        this.emit = emitHasOnce;
    }
    var evtmap = this.onceEvents[event];
    if (!evtmap || typeof evtmap !== 'object') {
        evtmap = this.onceEvents[event] = [listener];
        if (typeof event === 'symbol')
            this._symbolKeys.add(event);
    }
    else {
        evtmap.unshift(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn("Maximum event listeners for \"" + event + "\" once event!");
    }
    return this;
}
;
function removeAllListeners(event) {
    if (event === undefined) {
        this.events = {};
        this.onceEvents = {};
        this._symbolKeys = new Set;
    }
    else {
        this.events[event] = undefined;
        this.onceEvents[event] = undefined;
        if (typeof event === 'symbol')
            this._symbolKeys.delete(event);
    }
    return this;
}
;
function setMaxListeners(n) {
    this.maxListeners = n;
    return this;
}
;
function getMaxListeners() {
    return this.maxListeners;
}
;
function listeners(event) {
    if (this.emit === emit)
        return this.events[event] ? this.events[event].tasksAsArray().slice() : [];
    else {
        if (this.events[event] && this.onceEvents[event]) {
            return this.events[event].tasksAsArray().concat(this.onceEvents[event]);
        }
        else if (this.events[event])
            return this.events[event].tasksAsArray();
        else if (this.onceEvents[event])
            return this.onceEvents[event];
        else
            return [];
    }
}
;
function eventNames() {
    var _this = this;
    if (this.emit === emit) {
        var keys = Object.keys(this.events);
        return keys.concat(Array.from(this._symbolKeys)).filter(function (x) { return (x in _this.events) && _this.events[x] && _this.events[x].length; });
    }
    else {
        var keys = Object.keys(this.events).filter(function (x) { return _this.events[x] && _this.events[x].length; });
        var keysO = Object.keys(this.onceEvents).filter(function (x) { return _this.onceEvents[x] && _this.onceEvents[x].length; });
        return keys.concat(keysO, Array.from(this._symbolKeys).filter(function (x) { return (((x in _this.events) && _this.events[x] && _this.events[x].length) ||
            ((x in _this.onceEvents) && _this.onceEvents[x] && _this.onceEvents[x].length)); }));
    }
}
;
function listenerCount(type) {
    if (this.emit === emit)
        return this.events[type] && this.events[type].length || 0;
    else
        return (this.events[type] && this.events[type].length || 0) + (this.onceEvents[type] && this.onceEvents[type].length || 0);
}
;
EventEmitter.prototype.emit = emit;
EventEmitter.prototype.on = addListener;
EventEmitter.prototype.once = once;
EventEmitter.prototype.addListener = addListener;
EventEmitter.prototype.removeListener = removeListener;
EventEmitter.prototype.hasListeners = hasListeners;
EventEmitter.prototype.prependListener = prependListener;
EventEmitter.prototype.prependOnceListener = prependOnceListener;
EventEmitter.prototype.off = removeListener;
EventEmitter.prototype.removeAllListeners = removeAllListeners;
EventEmitter.prototype.setMaxListeners = setMaxListeners;
EventEmitter.prototype.getMaxListeners = getMaxListeners;
EventEmitter.prototype.listeners = listeners;
EventEmitter.prototype.eventNames = eventNames;
EventEmitter.prototype.listenerCount = listenerCount;
//# sourceMappingURL=ee.js.map