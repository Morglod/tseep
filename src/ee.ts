import { DefaultEventMap, IEventEmitter } from './index';
import { TaskCollection, _fast_remove_single } from './task-collection';
import { nullObj, ArgsNum } from './utils';

function emit(this: EventEmitter, event: string, a: any, b: any, c: any, d: any, e: any) {
    const ev = this.events[event];
    if (ev) {
        if (ev.length === 0) return false;

        if (ev.argsNum < 6) {
            ev.call(a, b, c, d, e);
        } else {
            ev.call.apply(undefined, arguments);
        }
        return true;
    }
    return false;
}

function emitHasOnce(this: EventEmitter, event: string, a: any, b: any, c: any, d: any, e: any) {
    const ev = this.events[event];
    if (ev) {
        if (ev.length === 0) return false;

        if (ev.argsNum < 6) {
            ev.call(a, b, c, d, e);
        } else {
            ev.call.apply(undefined, arguments);
        }
    }
    const oev = this.onceEvents[event];
    if (oev) {
        if (typeof oev === 'function') {
            this.onceEvents[event] = undefined;

            if (arguments.length < 6) {
                oev(a, b, c, d, e);
            } else {
                oev.apply(undefined, arguments);
            }
        } else {
            const fncs = oev;
            this.onceEvents[event] = undefined;
    
            if (arguments.length < 6) {
                for (let i = 0; i < fncs.length; ++i) fncs[i](a, b, c, d, e);
            } else {
                for (let i = 0; i < fncs.length; ++i) fncs[i].apply(undefined, arguments);
            }
        }

        return true;
    }
    return !!ev;
}

/** Implemented event emitter */
export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    events: {
        [eventName in keyof EventMap]?: TaskCollection<EventMap[eventName]>
    } = nullObj();

    onceEvents: {
        [eventName in keyof EventMap]?: (EventMap[eventName][]) | EventMap[eventName]
    } = nullObj();

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
    argsNum: ArgsNum<EventMap[EventKey]> = listener.length as any,
): EventEmitter<EventMap> {
    if (typeof listener !== 'function') throw new TypeError('The listener must be a function');
    let evtmap: typeof this.events[EventKey] = this.events[event];
    if (!evtmap) {
        this.events[event] = new TaskCollection(argsNum, true, listener, false);
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        evtmap.push(listener);
        evtmap.growArgsNum(argsNum);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) console.warn(`Maximum event listeners for "${String(event)}" event!`);
    }
    return this;
}

function removeListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey, listener: EventMap[EventKey]): EventEmitter<EventMap> {
    const evt = this.events[event];
    if (evt) {
        evt.removeLast(listener);
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

function hasListeners<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey) {
    return this.events[event] && !!this.events[event].length;
}

function prependListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(
    this: EventEmitter<EventMap>,
    event: EventKey,
    listener: EventMap[EventKey],
    argsNum: ArgsNum<EventMap[EventKey]> = listener.length as any,
): EventEmitter<EventMap> {
    if (typeof listener !== 'function') throw new TypeError('The listener must be a function');
    let evtmap: typeof this.events[EventKey] = this.events[event];
    if (!evtmap || !(evtmap instanceof TaskCollection)) {
        evtmap = this.events[event] = new TaskCollection(argsNum, true, listener, false);
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        evtmap.insert(0, listener);
        evtmap.growArgsNum(argsNum);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) console.warn(`Maximum event listeners for "${String(event)}" event!`);
    }
    return this;
}

function prependOnceListener<EventMap extends DefaultEventMap = DefaultEventMap, EventKey extends keyof EventMap = string>(this: EventEmitter<EventMap>,event: EventKey, listener: EventMap[EventKey]): EventEmitter<EventMap> {
    if (this.emit as any === emit) {
        this.emit = emitHasOnce as any;
    }

    let evtmap = this.onceEvents[event];
    if (!evtmap || typeof evtmap !== 'object') {
        evtmap = this.onceEvents[event] = [ listener ];
        if (typeof event === 'symbol') this._symbolKeys.add(event);
    } else {
        // FIXME:
        throw new Error('FIXME');
        // evtmap.unshift(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) console.warn(`Maximum event listeners for "${String(event)}" once event!`);
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
    if (this.emit === (emit as any)) return this.events[event] ? (this.events[event].tasksAsArray().slice() as any[]) : [];
    else {
        if (this.events[event] && this.onceEvents[event]) {
            return [
                ...this.events[event].tasksAsArray(),
                ...(typeof this.onceEvents[event] === 'function' ? [ this.onceEvents[event] ] : this.onceEvents[event]) as any,
            ];
        }
        else if (this.events[event]) return this.events[event].tasksAsArray();
        else if (this.onceEvents[event]) return (typeof this.onceEvents[event] === 'function' ? [ this.onceEvents[event] ] : this.onceEvents[event]) as any;
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