[![NPM Version](https://badge.fury.io/js/tseep.svg?style=flat)](https://www.npmjs.com/package/tseep)

# tseep

Because there are N fastest event emitters. And we are fastest (feb 2023) 😏.

From up to **x12** faster than `eventemitter3` in terms of "classic api event emitters" (currently fastest for not classic too).

---

-   Fully typed args of `emit` method based on events map
-   Fully implements `NodeJS.EventEmitter` type & standart, provides interface
-   Worlds fastest pure-js EventEmitter
-   Fully tested with eventemitter3 tests

PS Uses `eval` for runtime codegenerations;  
dont afraid it, all js engines use it lol.

## Benchmarks

```
EventEmitter1 x     4,498,223 ops/sec
EventEmitter2 x     4,536,296 ops/sec
EventEmitter3 x     5,852,395 ops/sec
fastemitter x       6,127,215 ops/sec
event-emitter x     3,449,595 ops/sec
contra/emitter x    2,186,002 ops/sec
tsee x              5,231,167 ops/sec
tseep x            40,569,711 ops/sec  <---
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

!! **`__proto__`** event name is restricted !!

`EventEmitter<T>` where `T` extends `{ [eventName]: Call signature }`.

`EventEmitter.emit`'s args is fully typed based on events map.

## License

Not allowed for any AI model training in any way!

for others: MIT
