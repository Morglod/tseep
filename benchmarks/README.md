
> benchmarks@0.0.0 benchmark /Users/morglod/Desktop/Dev/tseep/benchmarks
> find run -name '*.js' -exec ./start.sh {} \;

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 3,623,014 ops/sec ±5.38% (84 runs sampled)
EventEmitter2 x 2,099,199 ops/sec ±0.45% (87 runs sampled)
EventEmitter3 x 4,815,012 ops/sec ±0.42% (89 runs sampled)
fastemitter x 3,500,224 ops/sec ±0.59% (87 runs sampled)
event-emitter x 1,649,388 ops/sec ±0.28% (87 runs sampled)
contra/emitter x 503,767 ops/sec ±0.18% (89 runs sampled)
tsee x 3,151,787 ops/sec ±0.27% (87 runs sampled)
tseep x 22,590,864 ops/sec ±0.19% (90 runs sampled)
Fastest is tseep
```

Starting benchmark emit-multi.js

```
EventEmitter1 x 10,999,235 ops/sec ±0.36% (90 runs sampled)
EventEmitter2 x 6,655,586 ops/sec ±0.40% (83 runs sampled)
EventEmitter3 x 8,558,716 ops/sec ±0.45% (88 runs sampled)
Drip x 6,631,401 ops/sec ±0.62% (89 runs sampled)
fastemitter x 5,555,847 ops/sec ±0.73% (88 runs sampled)
event-emitter x 5,045,015 ops/sec ±0.51% (89 runs sampled)
contra/emitter x 648,935 ops/sec ±0.22% (90 runs sampled)
tsee x 5,136,241 ops/sec ±0.41% (89 runs sampled)
tseep x 24,939,590 ops/sec ±0.23% (89 runs sampled)
Fastest is tseep
```

Starting benchmark once-multi.js

```
EventEmitter1 x 845,345 ops/sec ±1.84% (90 runs sampled)
EventEmitter2 x 392,585 ops/sec ±0.63% (86 runs sampled)
EventEmitter3 x 3,609,865 ops/sec ±0.87% (85 runs sampled)
Drip: 
fastemitter x 376,473 ops/sec ±3.08% (79 runs sampled)
event-emitter x 315,167 ops/sec ±0.53% (88 runs sampled)
contra/emitter x 479,869 ops/sec ±0.46% (90 runs sampled)
tseep x 9,985,201 ops/sec ±3.34% (86 runs sampled)
Fastest is tseep
```

Starting benchmark emit-empty.js

```
EventEmitter1 x 15,874,995 ops/sec ±0.46% (91 runs sampled)
EventEmitter2 x 25,216,444 ops/sec ±0.30% (87 runs sampled)
EventEmitter3 x 26,657,635 ops/sec ±0.25% (90 runs sampled)
Drip x 24,505,277 ops/sec ±0.28% (91 runs sampled)
fastemitter x 31,906,470 ops/sec ±0.62% (89 runs sampled)
event-emitter x 28,863,547 ops/sec ±0.36% (90 runs sampled)
contra/emitter x 609,338 ops/sec ±0.47% (86 runs sampled)
tsee x 10,673,263 ops/sec ±1.09% (86 runs sampled)
tseep x 667,518,714 ops/sec ±0.63% (82 runs sampled)
Fastest is tseep
```

Starting benchmark hundreds.js

```
EventEmitter1 x 488,577 ops/sec ±1.58% (84 runs sampled)
EventEmitter2 x 266,649 ops/sec ±0.47% (88 runs sampled)
EventEmitter3 x 577,613 ops/sec ±0.42% (90 runs sampled)
Drip x 506,428 ops/sec ±0.49% (88 runs sampled)
fastemitter x 575,021 ops/sec ±0.44% (82 runs sampled)
event-emitter x 339,171 ops/sec ±0.49% (88 runs sampled)
contra/emitter x 176,078 ops/sec ±0.42% (88 runs sampled)
tsee x 365,489 ops/sec ±0.39% (87 runs sampled)
tseep x 826,014 ops/sec ±1.44% (89 runs sampled)
Fastest is tseep
```

Starting benchmark listeners.js

```
EventEmitter1 x 14,922,462 ops/sec ±4.46% (87 runs sampled)
EventEmitter3 x 15,918,914 ops/sec ±0.61% (89 runs sampled)
fastemitter x 8,452,053 ops/sec ±0.59% (88 runs sampled)
tsee x 20,122,171 ops/sec ±1.78% (80 runs sampled)
tseep x 19,474,850 ops/sec ±0.63% (87 runs sampled)
Fastest is tsee
```

Starting benchmark emit.js

```
EventEmitter1 x 9,470,706 ops/sec ±0.46% (88 runs sampled)
EventEmitter2 x 9,044,527 ops/sec ±0.48% (88 runs sampled)
EventEmitter3 x 21,136,547 ops/sec ±1.98% (86 runs sampled)
Drip x 9,561,734 ops/sec ±0.46% (89 runs sampled)
fastemitter x 7,460,297 ops/sec ±0.82% (88 runs sampled)
event-emitter x 6,119,233 ops/sec ±0.64% (85 runs sampled)
contra/emitter x 552,188 ops/sec ±0.40% (87 runs sampled)
tsee x 5,771,893 ops/sec ±0.41% (87 runs sampled)
tseep x 99,631,038 ops/sec ±0.34% (89 runs sampled)
Fastest is tseep
```

Starting benchmark init.js

```
EventEmitter1 x 18,383,863 ops/sec ±2.88% (86 runs sampled)
EventEmitter2 x 21,330,869 ops/sec ±0.25% (87 runs sampled)
EventEmitter3 x 26,529,057 ops/sec ±0.72% (86 runs sampled)
Drip x 33,086,149 ops/sec ±4.53% (84 runs sampled)
fastemitter x 17,833,289 ops/sec ±0.55% (88 runs sampled)
event-emitter x 28,227,376 ops/sec ±3.69% (82 runs sampled)
contra/emitter x 12,247,073 ops/sec ±0.80% (88 runs sampled)
tsee x 4,728,162 ops/sec ±0.78% (86 runs sampled)
tseep x 15,501,118 ops/sec ±0.48% (89 runs sampled)
Fastest is Drip
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 10,427,795 ops/sec ±0.29% (89 runs sampled)
EventEmitter2 x 9,882,895 ops/sec ±0.60% (85 runs sampled)
EventEmitter3 x 21,123,852 ops/sec ±0.57% (90 runs sampled)
Drip x 10,291,014 ops/sec ±0.39% (91 runs sampled)
event-emitter x 6,695,628 ops/sec ±0.43% (85 runs sampled)
contra/emitter x 561,732 ops/sec ±0.45% (90 runs sampled)
tsee x 6,188,867 ops/sec ±0.61% (85 runs sampled)
tseep x 99,361,369 ops/sec ±0.44% (87 runs sampled)
Fastest is tseep
```

Starting benchmark context.js

```
EventEmitter1 x 9,270,400 ops/sec ±0.44% (87 runs sampled)
EventEmitter2 x 8,946,180 ops/sec ±0.49% (89 runs sampled)
EventEmitter3 x 20,836,010 ops/sec ±0.29% (90 runs sampled)
Drip x 9,289,677 ops/sec ±0.48% (90 runs sampled)
fastemitter x 7,379,052 ops/sec ±0.80% (86 runs sampled)
event-emitter x 6,110,232 ops/sec ±0.30% (86 runs sampled)
contra/emitter x 555,871 ops/sec ±0.75% (89 runs sampled)
tsee x 5,659,185 ops/sec ±0.37% (87 runs sampled)
tseep x 70,135,618 ops/sec ±0.35% (89 runs sampled)
Fastest is tseep
```

Starting benchmark once.js

```
EventEmitter1 x 7,980,357 ops/sec ±0.43% (88 runs sampled)
EventEmitter2 x 5,298,924 ops/sec ±1.55% (79 runs sampled)
EventEmitter3 x 19,428,310 ops/sec ±0.72% (85 runs sampled)
Drip x 16,668,583 ops/sec ±0.19% (90 runs sampled)
fastemitter x 11,786,875 ops/sec ±0.78% (86 runs sampled)
event-emitter x 4,528,121 ops/sec ±0.69% (89 runs sampled)
contra/emitter x 2,250,594 ops/sec ±0.33% (87 runs sampled)
tseep x 122,151,335 ops/sec ±1.15% (88 runs sampled)
Fastest is tseep
```

Starting benchmark add-remove.js

```
EventEmitter1 x 14,957,228 ops/sec ±1.81% (86 runs sampled)
EventEmitter2 x 10,441,240 ops/sec ±1.86% (80 runs sampled)
EventEmitter3 x 21,523,110 ops/sec ±0.80% (84 runs sampled)
Drip x 128,790,533 ops/sec ±0.69% (87 runs sampled)
fastemitter x 33,130,917 ops/sec ±0.27% (89 runs sampled)
event-emitter x 8,365,123 ops/sec ±0.28% (89 runs sampled)
contra/emitter x 9,471,084 ops/sec ±0.30% (90 runs sampled)
tsee x 8,649,578 ops/sec ±0.64% (89 runs sampled)
tseep x 30,811,556 ops/sec ±0.62% (88 runs sampled)
Fastest is Drip
```

