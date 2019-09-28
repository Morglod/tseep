# tseep

Optimizied tsee

Typed EventEmitter implemented with [tsargs](https://www.npmjs.com/package/tsargs), based on nodejs EventEmitter.  
Fully implements `NodeJS.EventEmitter` type, provides interface & proxy class.

## Install & use

```
npm i tsee
```

Simple usage:
```ts
import { EventEmitter } from 'tsee';

const events = new EventEmitter<{
    foo: (a: number, b: string) => void,
}>();

// foo's arguments is fully type checked
events.emit('foo', 123, 'hello world');
```

Cast any other compatible to `NodeJS.EventEmitter` to typed:
```ts
import { asTypedEventEmitter } from 'tsee';

const typedEmitter = asTypedEventEmitter<{
    foo: (a: number, b: string) => void,
    boo: (a: number, b: string) => void,
}>(myEmitter);

typedEmitter.emit('foo', 123, 'hello world');
```

## Advenced usage for non default event emitters

If you use custom EventEmitter implementation, you can simply cast it to `tsee.IEventEmitter` interface:

```ts
import { CustomEventEmitter } from 'my-event-emitter';
import * as tsee from 'tsee';

// Simple type case
const typed = new CustomEventEmitter() as any as tsee.IEventEmitter<{ ... }>;

// Functional cast with `NodeJS.EventEmitter` type constraints
const typed = asTypedEventEmitter<{ ... }>(new CustomEventEmitter());

```

`tsee.EventEmitter` class is implemented EventEmitter from 'events' package.

## Api

`EventEmitter<T>` where `T` extends `{ [eventName]: Call signature }`.

`EventEmitter.emit`'s args is fully typed based on events map.

For `foo` event in example above, signature is: `emit(eventName: 'foo', a: number, b: string)`.
