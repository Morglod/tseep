import { DefaultEventMap, IEventEmitter } from './index';
import { ArgsN, ArgsNum } from 'tsargs';
import { TaskCollection } from './task-collection';
/** Implemented event emitter */
export declare class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    events: {
        [eventName in keyof EventMap]?: TaskCollection<EventMap[eventName]>;
    };
    onceEvents: {
        [eventName in keyof EventMap]?: EventMap[eventName][];
    };
    _symbolKeys: Set<symbol>;
    maxListeners: number;
    readonly _eventsCount: number;
    emit: <EventKey extends keyof EventMap>(event: EventKey, ...args: ArgsN<EventMap[EventKey]>) => boolean;
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
