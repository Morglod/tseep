"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_collection_1 = require("./task-collection");
/** Implemented event emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        var _this = this;
        this.events = {};
        this.maxListeners = Infinity;
        this.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (_this.events[event]) {
                _this.events[event].call(args);
                return !!_this.events[event].length;
            }
            return false;
        };
        this.on = function (event, listener) {
            _this.addListener(event, listener);
            return _this;
        };
        this.once = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, listener);
            });
            _this.addListener(event, onceListener);
            return _this;
        };
        this.addListener = function (event, listener) {
            if (!(event in _this.events))
                _this.events[event] = new task_collection_1.TaskCollection(listener.length, true, false);
            _this.events[event].push(listener);
            if (_this.maxListeners !== Infinity && _this.maxListeners <= _this.events[event].length)
                console.warn("Maximum event listeners for \"" + event + "\" event!");
            return _this;
        };
        this.removeListener = function (event, listener) {
            if (event in _this.events) {
                _this.events[event].remove(listener);
            }
            return _this;
        };
        this.hasListeners = function (event) {
            return _this.events[event] && !!_this.events[event].length;
        };
        this.prependListener = function (event, listener) {
            if (!(event in _this.events))
                new task_collection_1.TaskCollection(listener.length, true, false);
            _this.events[event].insert(0, listener);
            return _this;
        };
        this.prependOnceListener = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, listener);
            });
            _this.prependListener(event, onceListener);
            return _this;
        };
        this.off = function (event, listener) {
            return _this.removeListener(event, listener);
        };
        this.removeAllListeners = function (event) {
            delete _this.events[event];
            return _this;
        };
        this.setMaxListeners = function (n) {
            _this.maxListeners = n;
            return _this;
        };
        this.getMaxListeners = function () {
            return _this.maxListeners;
        };
        this.listeners = function (event) {
            return _this.events[event]._tasks.slice();
        };
        this.rawListeners = function (event) {
            return _this.events[event]._tasks;
        };
        this.eventNames = function () {
            return Object.keys(_this.events);
        };
        this.listenerCount = function (type) {
            return _this.events[type] && _this.events[type].length || 0;
        };
    }
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=ee.js.map