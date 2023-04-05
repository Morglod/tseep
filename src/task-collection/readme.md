# task-collection

Utility for function-call baking

## Example

Classical code:
```ts
const myCallbacks = [ /* ... functions ... */ ];

// instead (fastest variant)
for (let i = 0; i < myCallbacks.length; ++i) {
    myCallbacks[i](...args);
}

// (or slowest possible)
myCallbacks.forEach(func => func(...args));
```

`bakeCollectionVariadic` (for unknown arguments num, slower than for known):
```ts
const myCallbacks: Function[] = [ /* ... functions ... */ ];

const callAllCallbacks = bakeCollectionVariadic(myCallbacks);
callAllCallbacks(...args);
```

`bakeCollection` (for known arguments num):
```ts
const myCallbacks: ((a: number, b: string) => void)[] = [ /* ... functions ... */ ];

const callAllCallbacks = bakeCollection(myCallbacks, 2);
callAllCallbacks(...args);
```

TaskCollection:
```ts
const myCallbacks: ((a: number, b: string) => void)[] = [ /* ... functions ... */ ];

const tasks = new TaskCollection<(a: number, b: string) => void>(
    2, // args num
    true, // auto rebuild
    myCallbacks, // initial tasks
);

tasks.call(...args);
```

## Benchmark

Fancy results

|callbacks count|call time (baked)|call time (for loop)|ratio (vs for loop)|
|:-|:-|:-|:-|
|10|0.006|0.06|x10|
|100|0.1|0.6|x6|
|500|0.3|4.6|x15|
|1000|0.9|15.1|x17|

### Detailed

Without fallbacks version

```
array, forI loop:
funcs num       | bake time     | first call time       | call time     | heap change

10              | 0.071527 ms   | 0.038573 ms           | 0.062221 ms   | 0.188 mb
100             | 0.001181 ms   | 0.03377 ms            | 0.612619 ms   | 0.032 mb
500             | 0.000705 ms   | 0.156118 ms           | 4.666155 ms   | 0.141 mb
1000            | 0.012574 ms   | 0.835642 ms           | 15.142098 ms  | 0.330 mb
10000           | 0.004717 ms   | 11.078726 ms          | 11.761093 ms  | 0.512 mb
15000           | 0.003339 ms   | 0.704004 ms           | 11.356525 ms  | 0.990 mb
25000           | 0.003304 ms   | 1.045754 ms           | 18.497829 ms  | 0.151 mb
35000           | 0.002917 ms   | 1.515987 ms           | 27.65194 ms   | 2.713 mb
50000           | 0.003087 ms   | 2.072114 ms           | 39.018164 ms  | 0.775 mb

bakeCollection:
funcs num       | bake time     | first call time       | call time     | heap change

10              | 0.633127 ms   | 0.003448 ms           | 0.006102 ms   | 0.033 mb
100             | 1.308459 ms   | 0.028572 ms           | 0.104195 ms   | 0.096 mb
500             | 1.821842 ms   | 0.094679 ms           | 0.383843 ms   | 0.459 mb
1000            | 4.506658 ms   | 0.673133 ms           | 0.977924 ms   | 0.897 mb
10000           | 40.105141 ms  | 0.88919 ms            | 8.601337 ms   | -0.604 mb
15000           | 50.323256 ms  | 1.481229 ms           | 13.459422 ms  | 13.597 mb
25000           | 82.25124 ms   | 2.582213 ms           | 22.776871 ms  | 10.873 mb
35000           | 131.732089 ms | 3.023655 ms           | 34.130334 ms  | 0.402 mb
50000           | 193.314935 ms | 33.88762 ms           | 41.629047 ms  | 26.424 mb
```


With fallbacks on 20000

```
array, forI loop:
funcs num       | bake time     | first call time       | call time     | heap change

10              | 0.52134 ms    | 0.057216 ms           | 0.06821 ms    | 0.188 mb
100             | 0.001553 ms   | 0.037626 ms           | 0.632089 ms   | 0.032 mb
500             | 0.000729 ms   | 0.164638 ms           | 4.716333 ms   | 0.141 mb
1000            | 0.002309 ms   | 0.275444 ms           | 20.432008 ms  | 0.308 mb
10000           | 0.003241 ms   | 9.658859 ms           | 10.865119 ms  | 0.340 mb
15000           | 0.003177 ms   | 0.839549 ms           | 11.882557 ms  | 1.152 mb
25000           | 0.003502 ms   | 0.945645 ms           | 16.109899 ms  | 0.138 mb
35000           | 0.00293 ms    | 1.376155 ms           | 24.671231 ms  | 2.689 mb
50000           | 0.00259 ms    | 2.265025 ms           | 34.682686 ms  | 0.829 mb

bakeCollection:
funcs num       | bake time     | first call time       | call time     | heap change

10              | 0.648736 ms   | 0.007256 ms           | 0.00604 ms    | 0.034 mb
100             | 1.322661 ms   | 0.026339 ms           | 0.142291 ms   | 0.095 mb
500             | 1.678343 ms   | 0.091189 ms           | 0.376521 ms   | 0.457 mb
1000            | 5.96154 ms    | 0.307703 ms           | 1.077013 ms   | 0.891 mb
10000           | 36.511181 ms  | 0.727753 ms           | 7.688291 ms   | 0.747 mb
15000           | 48.656974 ms  | 1.493597 ms           | 12.007429 ms  | 13.511 mb
25000           | 0.141912 ms   | 2.34219 ms            | 20.040303 ms  | -6.821 mb
35000           | 0.12378 ms    | 2.3137 ms             | 28.204282 ms  | -0.938 mb
50000           | 0.026997 ms   | 2.845693 ms           | 34.269508 ms  | 4.841 mb
```