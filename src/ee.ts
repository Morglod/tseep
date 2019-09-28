import { DefaultEventMap, IEventEmitter } from './index';
import { ArgsN } from 'tsargs';
import { TaskCollection } from './task-collection';

/** Implemented event emitter */
export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    events: {
        [eventName in keyof EventMap]?: TaskCollection<(...args: any) => void>
    } = {};

    maxListeners: number = Infinity;

    emit = <EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: ArgsN<EventMap[EventKey]>
    ) => {
        if (this.events[event]) {
            this.events[event].call(args);
            return !!this.events[event].length;
        }
        return false;
    };

    on = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.addListener(event, listener);
        return this;
    };
    once = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        const onceListener = ((...args: any) => {
            listener(...args);
            this.removeListener(event, listener);
        }) as any;
        this.addListener(event, onceListener);
        return this;
    };
    addListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        if (!(event in this.events)) this.events[event] = new TaskCollection(listener.length, true, false);
        this.events[event].push(listener);
        if (this.maxListeners !== Infinity && this.maxListeners <= this.events[event].length) console.warn(`Maximum event listeners for "${event}" event!`);
        return this;
    };
    removeListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        if (event in this.events) {
            this.events[event].remove(listener);
        }
        return this;
    };
    hasListeners = <EventKey extends keyof EventMap = string>(event: EventKey) => {
        return this.events[event] && !!this.events[event].length;
    };
    prependListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        if (!(event in this.events)) new TaskCollection(listener.length, true, false);
        this.events[event].insert(0, listener);
        return this;
    };
    prependOnceListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        const onceListener = ((...args: any) => {
            listener(...args);
            this.removeListener(event, listener);
        }) as any;
        this.prependListener(event, onceListener);
        return this;
    };
    off = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        return this.removeListener(event, listener);
    };
    removeAllListeners = <EventKey extends keyof EventMap = string>(event?: EventKey): this => {
        delete this.events[event];
        return this;
    };
    setMaxListeners = (n: number): this => {
        this.maxListeners = n;
        return this;
    };
    getMaxListeners = (): number => {
        return this.maxListeners;
    };
    listeners = <EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][] => {
        return [ ...this.events[event]._tasks ] as any[];
    };
    rawListeners = <EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][] => {
        return this.events[event]._tasks as any[];
    };
    eventNames = (): Array<string | symbol> => {
        return Object.keys(this.events);
    };
    listenerCount = <EventKey extends keyof EventMap = string>(type: EventKey): number => {
        return this.events[type] && this.events[type].length || 0;
    };
}
