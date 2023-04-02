# event emitter

## Переключение реализаций

При вызове emit мы должны так же обработать once listener'ы (которых может и не быть).  
Если их не будет вообще, мы будем при каждом вызове emit тратиться на проверку существования once обработчиков.

Чтобы сэкономить на этой проверке мы можем "переключать" реализацию метода emit в зависимости от наличия once обработчиков

Было:

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

Стало:

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

Самый быстрый на данный момент способ использовать "словари" это js объект.  
Чтобы ускорить доступ к полям, необходимо после создания пустого объекта указывать `__proto__ = null`:

```ts
function nullObj() {
    const x = {};
    (x as any).__proto__ = null;
    return x;
}
```

Это связано с наследованием и тем что движек будет лишний раз переходить по ссылке в `__proto__` чтобы уточнить наличие какого либо поля.

Скорее всего это так же влияет на генерацию классов. Движек добавляет лишний vtable.

Почему функция должна быть написана отдельно?  
Так выше шанс что js соптимизирует ее в байт код, тк у нее нет зависимостей и возвращаемое значение всегда одно и тоже.

## Передача аргументов

Если аргументов больше 6 то быстрее вызвать .apply(..., arguments) чем .call(arg1, arg2, arg3, ...);

Так же при вызове событий желательно иметь фиксированное кол-во аргументов.

## task-collection

`eval` можно использовать для генерации кода функции с прямым вызовом колбеков без использования массива.

Вместо вызова массива функций, можно объединить все колбеки в одну функцию, которая вызывает каждый колбек последовательно. Таким образом, можно избавиться от массива и его индексации, что может ускорить вызов списка функций.

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

Вызовем для массива функций:

```ts
mergeCallbacks([
    f1, f2, f3
])
```

Вот что будет сгененировано внутри mergeCallbacks:

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
