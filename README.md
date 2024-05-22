[![NPM Version](https://badge.fury.io/js/tseep.svg?style=flat)](https://www.npmjs.com/package/tseep)
[![GitHub stars](https://img.shields.io/github/stars/Morglod/tseep.svg?style=social&label=Star)](https://GitHub.com/Morglod/tseep/)

# tseep

Because there are N fastest event emitters. And we are fastest (feb 2023) 😏.

Up to **x12** faster than `eventemitter3` in terms of "classic api event emitters" (currently fastest for not classic too).

---

-   Fully typed args of `emit` method based on events map
-   Fully implements `NodeJS.EventEmitter` type & standart, provides interface
-   Worlds fastest pure-js `EventEmitter`
-   Fully tested with eventemitter3 tests
-   No external deps
-   Only 381 bytes size in real app (brotlied)

[how it works](./docs/how_it_works_en.md)

## Benchmarks

emit-multiple-listeners:
```
tseep x            40,569,711 ops/sec  <---
EventEmitter1 x     4,498,223 ops/sec
EventEmitter2 x     4,536,296 ops/sec
EventEmitter3 x     5,852,395 ops/sec
fastemitter x       6,127,215 ops/sec
event-emitter x     3,449,595 ops/sec
contra/emitter x    2,186,002 ops/sec
tsee x              5,231,167 ops/sec
emitix x            6,549,983 ops/sec 
Fastest is [ 'tseep' ]
```

[benchmarks](./benchmarks/README.md)

Make an issue to include yours event emitter, lets find the fastest!

## Install & use

```
npm i tseep
```

Simple usage:

```ts
import { EventEmitter } from "tseep";

const events = new EventEmitter<{
    foo: (a: number, b: string) => void;
}>();

// foo's arguments is fully type checked
events.emit("foo", 123, "hello world");
```

## Api

`EventEmitter<T>` where `T` extends `{ [eventName]: Call signature }`.

`EventEmitter.emit`'s args is fully typed based on events map.

!! **`__proto__`** event name is restricted (type guard exists) !!

By default listeners are not bound to EventEmitter, so you may get some problems around inheritance.  
First of all, better use incapsulation. Its faster, safer, clear.  
Other variant is to use addListenerBound/removeListenerBound.  
Its 2-3x slower for add/remove operation but than you will have proper 'this' context inside listener.

```ts
// Listener = (...args: any[]) => Promise<any>|void
// EventMap extends { [event in (string|symbol)]: Listener }

class EventEmitter<EventMap> {
    readonly maxListeners: number;
    readonly _eventsCount: number;

    emit(event: EventKey, ...args: ArgsN<EventMap[EventKey]>): boolean;
    on(event: EventKey, listener: EventMap[EventKey]): this;
    once(event: EventKey, listener: EventMap[EventKey]): this;
    addListener(event: EventKey, listener: EventMap[EventKey], argsNum?: ArgsNum<EventMap[EventKey]>): this;
    removeListener(event: EventKey, listener: EventMap[EventKey]): this;
    hasListeners(event: EventKey): boolean;
    prependListener(event: EventKey, listener: EventMap[EventKey]): this;
    prependOnceListener(event: EventKey, listener: EventMap[EventKey]): this;
    off(event: EventKey, listener: EventMap[EventKey]): this;
    removeAllListeners(event?: EventKey): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: EventKey): EventMap[EventKey][];
    rawListeners(event: EventKey): EventMap[EventKey][];
    eventNames(): Array<string | symbol>;
    listenerCount(type: EventKey): number;

    // special methods that are a bit slower than addListener/removeListener
    // but they binds listeners to current EventEmitter or custom object
    addListenerBound(event: EventKey, listener: EventMap[EventKey], bindTo?: any = this, argsNum?: ArgsNum<EventMap[EventKey]>): this;
    removeListenerBound(event: EventKey, listener: EventMap[EventKey]): this;
}
```

## License

MIT
