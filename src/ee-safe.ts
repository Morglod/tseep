import type { DefaultEventMap, IEventEmitter } from './types';
import { _fast_remove_single } from './task-collection/utils';
import { nullObj, ArgsNum } from './utils';

function emit(this: EventEmitter, event: string, a: any, b: any, c: any, d: any, e: any) {
    const ev = this.events[event];
    if (ev) {
        if (ev.length === 0) return false;

        if (arguments.length < 6) {
            for (let i = 0, len = ev.length; i < len; ++i) {
                ev[i](a, b, c, d, e);
            }
        } else {
            const arr = new Array(arguments.length - 1);
            for (let i = 0, len = arr.length; i < len; ++i) {
                arr[i] = arguments[i + 1];
            }
            for (let i = 0, len = ev.length; i < len; ++i) {
                ev[i].apply(undefined, arr);
            }
        }
        return true;
    }
    return false;
}

function emitHasOnce(this: EventEmitter, event: string, a: any, b: any, c: any, d: any, e: any) {
    const ev = this.events[event];
    let argsArr;

    if (ev !== undefined) {
        if (ev.length === 0) return false;

        if (arguments.length < 6) {
            for (let i = 0, len = ev.length; i < len; ++i) {
                ev[i](a, b, c, d, e);
            }
        } else {
            argsArr = new Array(arguments.length - 1);
            for (let i = 0, len = argsArr.length; i < len; ++i) {
                argsArr[i] = arguments[i + 1];
            }
            for (let i = 0, len = ev.length; i < len; ++i) {
                ev[i].apply(undefined, argsArr);
            }
        }
    }
    const oev = this.onceEvents[event];
    if (oev) {
        if (typeof oev === 'function') {
            this.onceEvents[event] = undefined;

            if (arguments.length < 6) {
                oev(a, b, c, d, e);
            } else {
                if (argsArr === undefined) {
                    argsArr = new Array(arguments.length - 1);
                    for (let i = 0, len = argsArr.length; i < len; ++i) {
                        argsArr[i] = arguments[i + 1];
                    }
                }
                oev.apply(undefined, argsArr);
            }
        } else {
            const fncs = oev;
            this.onceEvents[event] = undefined;
    
            if (arguments.length < 6) {
                for (let i = 0; i < fncs.length; ++i) {
                    fncs[i](a, b, c, d, e);
                }
            } else {
                if (argsArr === undefined) {
                    argsArr = new Array(arguments.length - 1);
                    for (let i = 0, len = argsArr.length; i < len; ++i) {
                        argsArr[i] = arguments[i + 1];
                    }
                }
                for (let i = 0, len = oev.length; i < len; ++i) {
                    oev[i].apply(undefined, argsArr);
                }
            }
        }

        return true;
    }
    return ev !== undefined;
}

/** Implemented event emitter */
export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    events: {
        [eventName in keyof EventMap]?: EventMap[eventName][]
    } = nullObj();

    onceEvents: {
        [eventName in keyof EventMap]?: (EventMap[eventName][]) | EventMap[eventName]
    } = nullObj();

    boundFuncs: undefined | Map<Function, Function>;

    _symbolKeys: Set<symbol> = new Set;

    maxListeners: number = Infinity;

    get _eventsCount() {
        return this.eventNames().length;
    }

    emit: <EventKey extends keyof EventMap>(event: EventKey, ...args: Parameters<EventMap[EventKey]>) => boolean;
    on: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    once: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    addListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey], argsNum?: ArgsNum<EventMap[EventKey]>) => this;
    removeListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    hasListeners: <EventKey extends keyof EventMap = string>(event: EventKey) => boolean;
    prependListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    prependOnceListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    off: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    removeAllListeners: <EventKey extends keyof EventMap = string>(event?: EventKey) => this;
    setMaxListeners: (n: number) => this;
    getMaxListeners: () => number;
    listeners: <EventKey extends keyof EventMap = string>(event: EventKey) => EventMap[EventKey][];
    rawListeners: <EventKey extends keyof EventMap = string>(event: EventKey) => EventMap[EventKey][];
    eventNames: () => Array<string | symbol>;
    listenerCount: <EventKey extends keyof EventMap = string>(type: EventKey) => number;

    addListenerBound: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey], bindTo?: any, argsNum?: ArgsNum<EventMap[EventKey]>) => this;
    removeListenerBound: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
}


function once<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(
    this: EventEmitter<EventMap>,
    event: EventKey,
    listener: EventMap[EventKey]
): EventEmitter<EventMap> {
    if (this.emit as any === emit) {
        this.emit = emitHasOnce as any;
    }

    switch (typeof this.onceEvents[event]) {
        case 'undefined':
            this.onceEvents[event] = listener;
            if (typeof event === 'symbol') this._symbolKeys.add(event);
            break;
        case 'function':
            this.onceEvents[event] = [ this.onceEvents[event] as any, listener ];
            break;
        case 'object':
            (this.onceEvents[event] as any[]).push(listener);
    }

    return this;
}

function addListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(
    this: EventEmitter<EventMap>,
    event: EventKey,
    listener: EventMap[EventKey],
    argsNum?: ArgsNum<EventMap[EventKey]>,
): EventEmitter<EventMap> {
    if (typeof listener !== 'function') throw new TypeError('The listener must be a function');
    let evtmap: typeof this.events[EventKey] = this.events[event];
    if (!evtmap) {
        this.events[event] = [listener];
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        evtmap.push(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) console.warn(`Maximum event listeners for "${String(event)}" event!`);
    }
    return this;
}

function removeListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey, listener: EventMap[EventKey]): EventEmitter<EventMap> {
    const evt = this.events[event];
    if (evt) {
        _fast_remove_single(evt, evt.indexOf(listener));
    }
    const evto = this.onceEvents[event];
    if (evto) {
        if (typeof evto === 'function') {
            this.onceEvents[event] = undefined;
        }
        else if (typeof evto === 'object') {
            if (evto.length === 1 && evto[0] === listener) {
                this.onceEvents[event] = undefined;
            } else {
                _fast_remove_single(evto as any[], (evto as any[]).lastIndexOf(listener));
            }
        }
    }
    return this;
}

function addListenerBound<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(
    this: EventEmitter<EventMap>,
    event: EventKey,
    listener: EventMap[EventKey],
    bindTo = this,
    argsNum: ArgsNum<EventMap[EventKey]> = listener.length as any,
): EventEmitter<EventMap> {
    if (!this.boundFuncs) this.boundFuncs = new Map;
    const bound = listener.bind(bindTo);
    this.boundFuncs.set(listener, bound);
    return this.addListener(event, bound, argsNum);
}

function removeListenerBound<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey, listener: EventMap[EventKey]): EventEmitter<EventMap> {
    const bound = this.boundFuncs?.get(listener);
    this.boundFuncs?.delete(listener);
    return this.removeListener(event, bound as any);
}

function hasListeners<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey) {
    return this.events[event] && !!this.events[event].length;
}

function prependListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(
    this: EventEmitter<EventMap>,
    event: EventKey,
    listener: EventMap[EventKey],
    argsNum?: ArgsNum<EventMap[EventKey]>,
): EventEmitter<EventMap> {
    if (typeof listener !== 'function') throw new TypeError('The listener must be a function');
    let evtmap: typeof this.events[EventKey] = this.events[event];
    if (evtmap === undefined) {
        evtmap = this.events[event] = [listener];
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        evtmap.unshift(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) console.warn(`Maximum event listeners for "${String(event)}" event!`);
    }
    return this;
}

function prependOnceListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey, listener: EventMap[EventKey]): EventEmitter<EventMap> {
    if (this.emit as any === emit) {
        this.emit = emitHasOnce as any;
    }

    const evtmap = this.onceEvents[event];
    if (!evtmap) {
        this.onceEvents[event] = [ listener ];
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else if (typeof evtmap !== 'object') {
        this.onceEvents[event] = [ listener, evtmap as any ];
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        evtmap.unshift(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) {
            console.warn(`Maximum event listeners for "${String(event)}" once event!`);
        }
    }

    return this;
}

function removeAllListeners<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>, event?: EventKey): EventEmitter<EventMap> {
    if (event === undefined) {
        this.events = nullObj();
        this.onceEvents = nullObj();
        this._symbolKeys = new Set;
    } else {
        this.events[event] = undefined;
        this.onceEvents[event] = undefined;
        if (typeof event === 'symbol') this._symbolKeys.delete(event);
    }
    return this;
}

function setMaxListeners<EventMap extends DefaultEventMap = DefaultEventMap>(this: EventEmitter<EventMap>,n: number): EventEmitter<EventMap> {
    this.maxListeners = n;
    return this;
}

function getMaxListeners<EventMap extends DefaultEventMap = DefaultEventMap>(this: EventEmitter<EventMap>): number {
    return this.maxListeners;
}

function listeners<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>, event: EventKey): EventMap[EventKey][] {
    if (this.emit === (emit as any)) return this.events[event] ? this.events[event].slice() : [];
    else {
        if (this.events[event] && this.onceEvents[event]) {
            return [
                ...this.events[event],
                ...(typeof this.onceEvents[event] === 'function' ? [ this.onceEvents[event] ] : (this.onceEvents[event] as any).slice()) as any,
            ];
        }
        else if (this.events[event]) return this.events[event].slice();
        else if (this.onceEvents[event]) return (typeof this.onceEvents[event] === 'function' ? [ this.onceEvents[event] ] : (this.onceEvents[event] as any).slice()) as any;
        else return [];
    }
}

function eventNames<EventMap extends DefaultEventMap = DefaultEventMap>(this: EventEmitter<EventMap>): Array<string | symbol> {
    if (this.emit === (emit as any)) {
        const keys = Object.keys(this.events);
        return [ ...keys, ...Array.from(this._symbolKeys) ].filter((x: any) => (x in this.events) && this.events[x] && this.events[x].length);
    }
    else {
        const keys = Object.keys(this.events).filter((x: any) => this.events[x] && this.events[x].length);
        const keysO = Object.keys(this.onceEvents).filter((x: any) => this.onceEvents[x] && this.onceEvents[x].length);
        return [ ...keys, ...keysO, ...Array.from(this._symbolKeys).filter((x: any) => (
            ((x in this.events) && this.events[x] && this.events[x].length) ||
            ((x in this.onceEvents) && this.onceEvents[x] && this.onceEvents[x].length)
        )) ];
    }
}

function listenerCount<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>, type: EventKey): number {
    if (this.emit === (emit as any)) return this.events[type] && this.events[type].length || 0;
    else return (this.events[type] && this.events[type].length || 0) + (this.onceEvents[type] && this.onceEvents[type].length || 0);
}

EventEmitter.prototype.emit = emit as any;
EventEmitter.prototype.on = addListener;
EventEmitter.prototype.once = once;
EventEmitter.prototype.addListener = addListener;
EventEmitter.prototype.removeListener = removeListener;
EventEmitter.prototype.addListenerBound = addListenerBound;
EventEmitter.prototype.removeListenerBound = removeListenerBound;
EventEmitter.prototype.hasListeners = hasListeners as any;
EventEmitter.prototype.prependListener = prependListener;
EventEmitter.prototype.prependOnceListener = prependOnceListener;
EventEmitter.prototype.off = removeListener;
EventEmitter.prototype.removeAllListeners = removeAllListeners;
EventEmitter.prototype.setMaxListeners = setMaxListeners;
EventEmitter.prototype.getMaxListeners = getMaxListeners;
EventEmitter.prototype.listeners = listeners as any;
EventEmitter.prototype.eventNames = eventNames;
EventEmitter.prototype.listenerCount = listenerCount as any;