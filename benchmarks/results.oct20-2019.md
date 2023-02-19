> benchmarks@0.0.0 benchmark /Users/morglod/Desktop/Dev/tseep/benchmarks
> find run -name '\*.js' -exec ./start.sh {} \;

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 3,879,800 ops/sec ±1.06% (87 runs sampled)
EventEmitter2 x 2,081,132 ops/sec ±0.50% (85 runs sampled)
EventEmitter3 x 4,791,355 ops/sec ±0.36% (89 runs sampled)
fastemitter x 3,618,775 ops/sec ±0.60% (86 runs sampled)
event-emitter x 1,653,007 ops/sec ±0.64% (87 runs sampled)
contra/emitter x 506,260 ops/sec ±0.49% (90 runs sampled)
tsee x 3,173,901 ops/sec ±0.50% (84 runs sampled)
tseep x 22,149,904 ops/sec ±0.46% (90 runs sampled)
Fastest is tseep
```

Starting benchmark emit-multi.js

```
EventEmitter1 x 10,838,508 ops/sec ±0.53% (88 runs sampled)
EventEmitter2 x 6,543,461 ops/sec ±0.64% (89 runs sampled)
EventEmitter3 x 8,474,750 ops/sec ±0.56% (89 runs sampled)
Drip x 6,615,843 ops/sec ±0.69% (88 runs sampled)
fastemitter x 5,521,115 ops/sec ±0.70% (88 runs sampled)
event-emitter x 5,022,267 ops/sec ±0.64% (84 runs sampled)
contra/emitter x 643,212 ops/sec ±0.63% (88 runs sampled)
tsee x 5,119,410 ops/sec ±0.47% (86 runs sampled)
tseep x 26,999,066 ops/sec ±0.45% (88 runs sampled)
Fastest is tseep
```

Starting benchmark once-multi.js

```
EventEmitter1 x 863,070 ops/sec ±2.23% (86 runs sampled)
EventEmitter2 x 387,992 ops/sec ±0.82% (88 runs sampled)
EventEmitter3 x 3,582,891 ops/sec ±1.39% (82 runs sampled)
Drip:
fastemitter x 352,851 ops/sec ±5.27% (74 runs sampled)
event-emitter x 316,069 ops/sec ±0.52% (85 runs sampled)
contra/emitter x 476,760 ops/sec ±0.30% (88 runs sampled)
tseep x 10,816,866 ops/sec ±0.44% (88 runs sampled)
Fastest is tseep
```

Starting benchmark emit-empty.js

```
EventEmitter1 x 15,814,293 ops/sec ±0.49% (90 runs sampled)
EventEmitter2 x 25,102,796 ops/sec ±0.43% (89 runs sampled)
EventEmitter3 x 26,469,301 ops/sec ±0.39% (89 runs sampled)
Drip x 23,965,120 ops/sec ±0.43% (89 runs sampled)
fastemitter x 31,947,604 ops/sec ±0.36% (90 runs sampled)
event-emitter x 28,430,727 ops/sec ±0.84% (88 runs sampled)
contra/emitter x 609,307 ops/sec ±0.52% (90 runs sampled)
tsee x 10,636,438 ops/sec ±1.16% (86 runs sampled)
tseep x 678,064,270 ops/sec ±0.65% (90 runs sampled)
Fastest is tseep
```

Starting benchmark hundreds.js

```
EventEmitter1 x 475,101 ops/sec ±1.56% (88 runs sampled)
EventEmitter2 x 260,484 ops/sec ±0.75% (87 runs sampled)
EventEmitter3 x 568,688 ops/sec ±1.84% (86 runs sampled)
Drip x 521,536 ops/sec ±0.55% (88 runs sampled)
fastemitter x 578,481 ops/sec ±0.37% (89 runs sampled)
event-emitter x 332,460 ops/sec ±0.67% (89 runs sampled)
contra/emitter x 176,387 ops/sec ±0.89% (85 runs sampled)
tsee x 372,494 ops/sec ±0.41% (90 runs sampled)
tseep x 837,919 ops/sec ±0.38% (86 runs sampled)
Fastest is tseep
```

Starting benchmark listeners.js

```
EventEmitter1 x 14,817,832 ops/sec ±4.32% (88 runs sampled)
EventEmitter3 x 15,841,555 ops/sec ±0.57% (87 runs sampled)
fastemitter x 8,404,001 ops/sec ±0.49% (89 runs sampled)
tsee x 19,599,751 ops/sec ±3.90% (84 runs sampled)
tseep x 19,461,541 ops/sec ±0.61% (88 runs sampled)
Fastest is tseep
```

Starting benchmark emit.js

```
EventEmitter1 x 9,465,073 ops/sec ±0.44% (90 runs sampled)
EventEmitter2 x 9,236,214 ops/sec ±0.70% (88 runs sampled)
EventEmitter3 x 21,622,943 ops/sec ±0.60% (90 runs sampled)
Drip x 9,582,617 ops/sec ±0.50% (87 runs sampled)
fastemitter x 7,546,789 ops/sec ±0.66% (88 runs sampled)
event-emitter x 6,123,459 ops/sec ±0.63% (88 runs sampled)
contra/emitter x 551,548 ops/sec ±0.41% (90 runs sampled)
tsee x 5,782,902 ops/sec ±0.69% (85 runs sampled)
tseep x 156,362,827 ops/sec ±0.26% (89 runs sampled)
Fastest is tseep
```

Starting benchmark init.js

```
EventEmitter1 x 18,212,323 ops/sec ±2.81% (88 runs sampled)
EventEmitter2 x 21,444,178 ops/sec ±2.67% (86 runs sampled)
EventEmitter3 x 25,776,634 ops/sec ±1.07% (84 runs sampled)
Drip x 34,620,556 ops/sec ±0.65% (86 runs sampled)
fastemitter x 17,863,986 ops/sec ±0.34% (90 runs sampled)
event-emitter x 27,962,369 ops/sec ±3.72% (85 runs sampled)
contra/emitter x 12,086,710 ops/sec ±0.93% (83 runs sampled)
tsee x 4,670,780 ops/sec ±0.79% (86 runs sampled)
tseep x 6,072,554 ops/sec ±0.39% (88 runs sampled)
Fastest is Drip
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 15,746,350 ops/sec ±0.26% (86 runs sampled)
EventEmitter2 x 25,037,216 ops/sec ±0.40% (87 runs sampled)
EventEmitter3 x 25,841,895 ops/sec ±0.58% (88 runs sampled)
Drip x 22,459,373 ops/sec ±0.66% (89 runs sampled)
event-emitter x 12,910,451 ops/sec ±0.62% (89 runs sampled)
contra/emitter x 600,236 ops/sec ±0.63% (88 runs sampled)
tsee x 10,217,994 ops/sec ±1.17% (86 runs sampled)
tseep x 159,886,523 ops/sec ±0.58% (88 runs sampled)
Fastest is tseep
```

Starting benchmark context.js

```
EventEmitter1 x 9,207,301 ops/sec ±0.45% (88 runs sampled)
EventEmitter2 x 9,046,141 ops/sec ±0.48% (90 runs sampled)
EventEmitter3 x 20,753,784 ops/sec ±0.44% (89 runs sampled)
Drip x 9,190,201 ops/sec ±0.51% (90 runs sampled)
fastemitter x 7,292,445 ops/sec ±0.78% (86 runs sampled)
event-emitter x 6,108,475 ops/sec ±1.08% (86 runs sampled)
contra/emitter x 555,013 ops/sec ±0.57% (91 runs sampled)
tsee x 5,714,816 ops/sec ±0.53% (88 runs sampled)
tseep x 96,674,612 ops/sec ±0.59% (88 runs sampled)
Fastest is tseep
```

Starting benchmark once.js

```
EventEmitter1 x 8,098,519 ops/sec ±0.38% (87 runs sampled)
EventEmitter2 x 5,213,374 ops/sec ±2.17% (80 runs sampled)
EventEmitter3 x 19,087,658 ops/sec ±0.57% (88 runs sampled)
Drip x 16,538,576 ops/sec ±0.34% (89 runs sampled)
fastemitter x 12,112,609 ops/sec ±0.59% (84 runs sampled)
event-emitter x 4,534,413 ops/sec ±0.62% (87 runs sampled)
contra/emitter x 2,240,436 ops/sec ±0.45% (89 runs sampled)
tseep x 97,396,849 ops/sec ±4.42% (76 runs sampled)
Fastest is tseep
```

Starting benchmark add-remove.js

```
EventEmitter1 x 12,972,346 ops/sec ±4.18% (77 runs sampled)
EventEmitter2 x 9,897,928 ops/sec ±7.53% (77 runs sampled)
EventEmitter3 x 21,543,716 ops/sec ±8.47% (70 runs sampled)
Drip x 130,334,530 ops/sec ±0.93% (87 runs sampled)
fastemitter x 32,868,473 ops/sec ±0.56% (85 runs sampled)
event-emitter x 8,280,476 ops/sec ±0.56% (86 runs sampled)
contra/emitter x 8,916,220 ops/sec ±0.62% (89 runs sampled)
tsee x 8,326,154 ops/sec ±0.87% (87 runs sampled)
tseep x 37,812,148 ops/sec ±0.84% (89 runs sampled)
Fastest is Drip
```
