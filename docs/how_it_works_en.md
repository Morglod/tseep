# event emitter

## Switching Implementations

When calling emit, we also need to handle once listeners (which may not exist).
If they don't exist at all, we will waste time checking for the existence of once handlers every time we call emit.

To save on this check, we can "switch" the implementation of the emit method depending on the presence of once handlers.

Before:

```js
listeners;
onceListeners;

function emit(eventName) {
    e = listeners[eventName];
    if (e) { ... }

    oe = onceListeners[eventName];
    if (oe) { ... }
}
```

After:

```js
function emitNoOnce(eventName) { ... }

function emitHasOnce(eventName) { ... }

class EventEmitter {
    emit = emitNoOnce;

    addOnceListener() {
        this.emit = emitHasOnce;
    }
}
```

## Map

The fastest way to use "dictionaries" at the moment is with a JavaScript object.
To speed up access to fields, it is necessary to specify `__proto__ = null` after creating an empty object:

```ts
function nullObj() {
    const x = {};
    (x as any).__proto__ = null;
    return x;
}
```

This is related to inheritance and the fact that the engine will have to follow the link in __proto__ one more time to determine the presence of a field.

This probably also affects class generation. The engine adds an extra vtable.

Why should the function be written separately?
This increases the chance that JavaScript will optimize it to bytecode, as it has no dependencies and always returns the same value.

## Passing Arguments

If there are more than 6 arguments, it is faster to call .apply(..., arguments) than .call(arg1, arg2, arg3, ...).

It is also desirable to have a fixed number of arguments when calling events.

## task-collection

`eval` can be used to generate function code with a direct callback call without using an array.

Instead of calling an array of functions, you can combine all callbacks into one function that calls each callback sequentially. This way, you can get rid of the array and its indexing, which can speed up the call to the list of functions.

### `mergeCallbacks` from task-collection

```ts
function mergeCallbacks(arr: Function[]) {
    const merger = eval(`(function (collection) {
        ${arr.map((_, i) => `var f${i} = collection[${i}];`).join(" ")}
        return (function () {
            ${arr.map((_, i) => `f${i}();`).join(" ")}
        });
    })`);
    const baked = merger(arr);
    return baked;
}
```

Call for an array of functions:

```ts
mergeCallbacks([
    f1, f2, f3
])
```

This is what will be generated inside mergeCallbacks:

```ts
(function merger(collection) {
    var f0 = collection[0];
    var f1 = collection[1];
    var f2 = collection[2];
    return function baked() {
        f0();
        f1();
        f2();
    };
});
```

## Links (dead)

* https://v8.dev/blog/speculative-optimizations
* https://blog.logrocket.com/inside-the-v8-engine-5-tips-on-how-to-write-optimized-code/
* https://www.youtube.com/watch?v=UJPdhx5zTaw&ab_channel=GoogleDevelopers
* https://v8.dev/docs/design-principles
