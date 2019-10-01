
> benchmarks@0.0.0 benchmark /Users/morglod/Desktop/Dev/tseep/benchmarks
> find run -name '*.js' -exec ./start.sh {} \;

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 3,734,481 ops/sec ±1.21% (85 runs sampled)
EventEmitter2 x 2,020,684 ops/sec ±1.33% (87 runs sampled)
EventEmitter3 x 4,758,206 ops/sec ±1.27% (88 runs sampled)
fastemitter x 3,559,256 ops/sec ±0.55% (88 runs sampled)
event-emitter x 1,653,731 ops/sec ±0.43% (90 runs sampled)
contra/emitter x 502,403 ops/sec ±0.59% (85 runs sampled)
tsee x 3,120,487 ops/sec ±0.49% (86 runs sampled)
tseep x 22,473,054 ops/sec ±0.46% (89 runs sampled)
Fastest is tseep
```

Starting benchmark emit-multi.js

```
EventEmitter1 x 10,775,862 ops/sec ±0.48% (87 runs sampled)
EventEmitter2 x 6,637,276 ops/sec ±0.75% (85 runs sampled)
EventEmitter3 x 8,568,950 ops/sec ±0.37% (90 runs sampled)
Drip x 6,518,462 ops/sec ±0.67% (89 runs sampled)
fastemitter x 5,631,135 ops/sec ±0.55% (87 runs sampled)
event-emitter x 4,996,020 ops/sec ±0.59% (87 runs sampled)
contra/emitter x 632,073 ops/sec ±0.74% (87 runs sampled)
tsee x 5,152,560 ops/sec ±0.56% (87 runs sampled)
tseep x 24,756,644 ops/sec ±0.50% (87 runs sampled)
Fastest is tseep
```

Starting benchmark once-multi.js

```
EventEmitter1 x 860,208 ops/sec ±2.14% (84 runs sampled)
EventEmitter2 x 377,202 ops/sec ±0.82% (84 runs sampled)
EventEmitter3 x 3,561,668 ops/sec ±0.81% (86 runs sampled)
Drip: 
fastemitter x 379,332 ops/sec ±0.48% (65 runs sampled)
event-emitter x 319,739 ops/sec ±0.50% (87 runs sampled)
contra/emitter x 485,086 ops/sec ±0.50% (90 runs sampled)
tseep x 10,458,817 ops/sec ±0.56% (88 runs sampled)
Fastest is tseep
```

Starting benchmark emit-empty.js

```
EventEmitter1 x 15,892,774 ops/sec ±0.43% (88 runs sampled)
EventEmitter2 x 25,000,035 ops/sec ±0.57% (90 runs sampled)
EventEmitter3 x 26,514,630 ops/sec ±0.41% (88 runs sampled)
Drip x 24,183,628 ops/sec ±0.40% (91 runs sampled)
fastemitter x 31,786,340 ops/sec ±0.41% (84 runs sampled)
event-emitter x 28,692,480 ops/sec ±0.53% (89 runs sampled)
contra/emitter x 611,265 ops/sec ±0.45% (86 runs sampled)
tsee x 10,579,225 ops/sec ±1.12% (85 runs sampled)
tseep x 673,799,468 ops/sec ±0.58% (88 runs sampled)
Fastest is tseep
```

Starting benchmark hundreds.js

```
EventEmitter1 x 436,196 ops/sec ±0.97% (88 runs sampled)
EventEmitter2 x 245,238 ops/sec ±0.66% (88 runs sampled)
EventEmitter3 x 536,497 ops/sec ±0.43% (89 runs sampled)
Drip x 477,906 ops/sec ±0.59% (88 runs sampled)
fastemitter x 568,447 ops/sec ±0.41% (90 runs sampled)
event-emitter x 314,159 ops/sec ±0.57% (83 runs sampled)
contra/emitter x 175,504 ops/sec ±0.57% (89 runs sampled)
tsee x 374,131 ops/sec ±0.31% (86 runs sampled)
tseep x 824,880 ops/sec ±0.51% (89 runs sampled)
Fastest is tseep
```

Starting benchmark listeners.js

```
EventEmitter1 x 14,881,885 ops/sec ±4.30% (90 runs sampled)
EventEmitter3 x 15,506,029 ops/sec ±4.65% (87 runs sampled)
fastemitter x 8,422,512 ops/sec ±0.54% (88 runs sampled)
tsee x 19,938,228 ops/sec ±3.44% (79 runs sampled)
tseep x 19,328,462 ops/sec ±0.81% (90 runs sampled)
Fastest is tsee
```

Starting benchmark emit.js

```
EventEmitter1 x 9,686,186 ops/sec ±0.60% (90 runs sampled)
EventEmitter2 x 9,116,879 ops/sec ±0.83% (84 runs sampled)
EventEmitter3 x 21,577,084 ops/sec ±0.45% (90 runs sampled)
Drip x 9,442,799 ops/sec ±0.59% (89 runs sampled)
fastemitter x 7,508,975 ops/sec ±0.74% (86 runs sampled)
event-emitter x 6,093,828 ops/sec ±0.61% (87 runs sampled)
contra/emitter x 550,212 ops/sec ±0.44% (86 runs sampled)
tsee x 5,677,884 ops/sec ±0.48% (87 runs sampled)
tseep x 98,991,865 ops/sec ±0.61% (89 runs sampled)
Fastest is tseep
```

Starting benchmark init.js

```
EventEmitter1 x 18,247,759 ops/sec ±2.72% (89 runs sampled)
EventEmitter2 x 21,271,191 ops/sec ±0.62% (88 runs sampled)
EventEmitter3 x 26,633,790 ops/sec ±0.70% (81 runs sampled)
Drip x 34,747,974 ops/sec ±0.58% (85 runs sampled)
fastemitter x 18,076,142 ops/sec ±0.27% (88 runs sampled)
event-emitter x 27,171,002 ops/sec ±3.46% (83 runs sampled)
contra/emitter x 12,122,662 ops/sec ±0.83% (87 runs sampled)
tsee x 4,641,144 ops/sec ±0.80% (83 runs sampled)
tseep x 15,542,682 ops/sec ±0.37% (89 runs sampled)
Fastest is Drip
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 15,616,302 ops/sec ±0.61% (86 runs sampled)
EventEmitter2 x 24,917,312 ops/sec ±0.50% (86 runs sampled)
EventEmitter3 x 25,776,381 ops/sec ±0.62% (85 runs sampled)
Drip x 22,884,521 ops/sec ±0.58% (89 runs sampled)
event-emitter x 12,937,339 ops/sec ±0.38% (89 runs sampled)
contra/emitter x 597,067 ops/sec ±0.45% (86 runs sampled)
tsee x 10,215,954 ops/sec ±1.09% (85 runs sampled)
tseep x 111,954,186 ops/sec ±0.37% (88 runs sampled)
Fastest is tseep
```

Starting benchmark context.js

```
EventEmitter1 x 9,159,235 ops/sec ±0.55% (88 runs sampled)
EventEmitter2 x 9,060,808 ops/sec ±0.55% (84 runs sampled)
EventEmitter3 x 20,633,780 ops/sec ±1.05% (89 runs sampled)
Drip x 9,221,680 ops/sec ±0.83% (90 runs sampled)
fastemitter x 7,261,159 ops/sec ±0.99% (90 runs sampled)
event-emitter x 6,034,865 ops/sec ±0.61% (89 runs sampled)
contra/emitter x 550,380 ops/sec ±0.72% (84 runs sampled)
tsee x 5,639,419 ops/sec ±0.43% (88 runs sampled)
tseep x 69,481,086 ops/sec ±0.54% (89 runs sampled)
Fastest is tseep
```

Starting benchmark once.js

```
EventEmitter1 x 7,953,115 ops/sec ±0.64% (85 runs sampled)
EventEmitter2 x 5,195,630 ops/sec ±1.68% (80 runs sampled)
EventEmitter3 x 19,701,663 ops/sec ±0.71% (86 runs sampled)
Drip x 16,479,199 ops/sec ±0.36% (89 runs sampled)
fastemitter x 11,428,391 ops/sec ±1.72% (82 runs sampled)
event-emitter x 4,579,620 ops/sec ±1.42% (88 runs sampled)
contra/emitter x 2,241,206 ops/sec ±0.33% (87 runs sampled)
tseep x 121,605,728 ops/sec ±0.44% (87 runs sampled)
Fastest is tseep
```

Starting benchmark add-remove.js

```
EventEmitter1 x 14,327,717 ops/sec ±1.78% (89 runs sampled)
EventEmitter2 x 10,153,258 ops/sec ±1.57% (80 runs sampled)
EventEmitter3 x 21,393,895 ops/sec ±0.77% (79 runs sampled)
Drip x 126,678,589 ops/sec ±0.66% (83 runs sampled)
fastemitter x 32,925,699 ops/sec ±0.83% (90 runs sampled)
event-emitter x 8,344,214 ops/sec ±0.35% (89 runs sampled)
contra/emitter x 9,420,393 ops/sec ±0.58% (88 runs sampled)
tsee x 8,602,440 ops/sec ±0.28% (88 runs sampled)
tseep x 31,700,831 ops/sec ±0.41% (88 runs sampled)
Fastest is Drip
```

