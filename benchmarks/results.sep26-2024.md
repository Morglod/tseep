Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 4,437,743 ops/sec ±3.59% (92 runs sampled)
EventEmitter2 x 4,588,433 ops/sec ±1.25% (92 runs sampled)
EventEmitter3 x 5,698,255 ops/sec ±3.51% (95 runs sampled)
Drip: 
fastemitter x 5,981,406 ops/sec ±3.85% (96 runs sampled)
event-emitter x 3,508,490 ops/sec ±2.82% (93 runs sampled)
contra/emitter x 2,183,943 ops/sec ±1.06% (99 runs sampled)
tsee x 5,163,550 ops/sec ±1.21% (94 runs sampled)
tseep x 89,030,882 ops/sec ±1.28% (99 runs sampled)
tseep safe x 15,235,353 ops/sec ±1.92% (98 runs sampled)
emitix x 6,201,874 ops/sec ±2.41% (96 runs sampled)
mitt x 3,587,734 ops/sec ±8.89% (90 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark emit-multi-args.js

```
EventEmitter1 x 28,167,952 ops/sec ±1.21% (96 runs sampled)
EventEmitter2 x 11,317,423 ops/sec ±1.45% (95 runs sampled)
EventEmitter3 x 13,598,191 ops/sec ±0.78% (96 runs sampled)
Drip x 11,556,443 ops/sec ±1.84% (97 runs sampled)
fastemitter x 10,473,493 ops/sec ±1.04% (99 runs sampled)
event-emitter x 8,953,542 ops/sec ±3.61% (91 runs sampled)
contra/emitter x 3,307,608 ops/sec ±1.33% (97 runs sampled)
tsee x 8,924,939 ops/sec ±1.62% (97 runs sampled)
tseep x 12,896,633 ops/sec ±2.49% (93 runs sampled)
tseep safe x 16,510,145 ops/sec ±5.36% (96 runs sampled)
emitix x 748,563 ops/sec ±0.97% (97 runs sampled)
mitt x 11,299,475 ops/sec ±0.86% (100 runs sampled)
Fastest is [ 'EventEmitter1' ]
```

Starting benchmark once-multi.js

```
EventEmitter1 x 1,611,540 ops/sec ±0.54% (100 runs sampled)
EventEmitter2 x 1,048,230 ops/sec ±3.18% (93 runs sampled)
EventEmitter3 x 5,207,621 ops/sec ±2.16% (93 runs sampled)
Drip: 
fastemitter x 1,297,807 ops/sec ±1.80% (100 runs sampled)
event-emitter x 735,169 ops/sec ±1.08% (98 runs sampled)
contra/emitter x 1,986,377 ops/sec ±0.26% (100 runs sampled)
tseep x 15,763,383 ops/sec ±5.06% (92 runs sampled)
tseep safe x 16,318,708 ops/sec ±1.78% (95 runs sampled)
emitix x 2,911,212 ops/sec ±0.98% (94 runs sampled)
mitt: 
Fastest is [ 'tseep safe' ]
```

Starting benchmark emit-empty.js

```
EventEmitter1 x 30,634,381 ops/sec ±0.28% (102 runs sampled)
EventEmitter2 x 48,526,404 ops/sec ±0.27% (99 runs sampled)
EventEmitter3 x 83,306,071 ops/sec ±1.59% (97 runs sampled)
Drip x 64,352,208 ops/sec ±2.86% (100 runs sampled)
fastemitter x 74,365,431 ops/sec ±4.42% (88 runs sampled)
event-emitter x 36,290,670 ops/sec ±1.68% (93 runs sampled)
contra/emitter x 3,420,482 ops/sec ±1.80% (95 runs sampled)
tsee x 21,691,204 ops/sec ±4.97% (92 runs sampled)
tseep x 991,967,974 ops/sec ±2.06% (99 runs sampled)
tseep safe x 212,527,140 ops/sec ±0.28% (98 runs sampled)
emitix x 124,492,463 ops/sec ±0.79% (93 runs sampled)
mitt x 35,413,814 ops/sec ±1.77% (94 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark hundreds.js

```
EventEmitter1 x 636,818 ops/sec ±2.20% (94 runs sampled)
EventEmitter2 x 604,351 ops/sec ±1.07% (95 runs sampled)
EventEmitter3 x 743,252 ops/sec ±0.96% (95 runs sampled)
Drip x 906,017 ops/sec ±0.84% (95 runs sampled)
fastemitter x 812,235 ops/sec ±1.53% (97 runs sampled)
event-emitter x 570,443 ops/sec ±3.96% (93 runs sampled)
contra/emitter x 440,489 ops/sec ±2.26% (99 runs sampled)
tsee x 1,203,446 ops/sec ±0.92% (97 runs sampled)
tseep x 1,883,383 ops/sec ±1.80% (96 runs sampled)
tseep safe x 1,823,935 ops/sec ±1.27% (98 runs sampled)
emitix x 1,596,442 ops/sec ±1.98% (96 runs sampled)
mitt x 1,119,906 ops/sec ±3.23% (95 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark listeners.js

```
EventEmitter1 x 27,931,506 ops/sec ±1.11% (96 runs sampled)
EventEmitter3 x 27,954,196 ops/sec ±2.16% (96 runs sampled)
fastemitter x 11,676,978 ops/sec ±1.11% (95 runs sampled)
tsee x 26,162,473 ops/sec ±3.28% (93 runs sampled)
tseep x 65,563,101 ops/sec ±2.13% (93 runs sampled)
tseep safe x 69,481,136 ops/sec ±3.26% (93 runs sampled)
Fastest is [ 'tseep safe' ]
```

Starting benchmark emit.js

```
EventEmitter1 x 16,539,256 ops/sec ±2.62% (96 runs sampled)
EventEmitter2 x 11,847,016 ops/sec ±0.27% (97 runs sampled)
EventEmitter3 x 14,279,072 ops/sec ±2.29% (94 runs sampled)
Drip x 15,240,616 ops/sec ±0.63% (100 runs sampled)
fastemitter x 11,896,262 ops/sec ±1.93% (100 runs sampled)
event-emitter x 9,761,517 ops/sec ±1.80% (96 runs sampled)
contra/emitter x 2,842,331 ops/sec ±2.09% (96 runs sampled)
tsee x 11,162,196 ops/sec ±4.57% (91 runs sampled)
tseep x 202,295,299 ops/sec ±1.65% (96 runs sampled)
tseep safe x 106,283,805 ops/sec ±1.51% (98 runs sampled)
emitix x 73,181,538 ops/sec ±1.83% (94 runs sampled)
mitt x 7,862,091 ops/sec ±1.38% (98 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark init.js

```
EventEmitter1 x 62,483,468 ops/sec ±1.55% (90 runs sampled)
EventEmitter2 x 114,507,697 ops/sec ±3.94% (88 runs sampled)
EventEmitter3 x 167,978,811 ops/sec ±1.29% (95 runs sampled)
Drip x 256,527,592 ops/sec ±1.28% (92 runs sampled)
fastemitter x 56,728,565 ops/sec ±1.00% (97 runs sampled)
event-emitter x 111,447,420 ops/sec ±5.10% (87 runs sampled)
contra/emitter x 32,258,271 ops/sec ±5.00% (93 runs sampled)
tsee x 15,094,811 ops/sec ±0.83% (94 runs sampled)
tseep x 11,439,223 ops/sec ±1.93% (94 runs sampled)
tseep safe x 11,502,431 ops/sec ±1.26% (98 runs sampled)
emitix x 168,103,833 ops/sec ±1.59% (95 runs sampled)
mitt x 30,838,611 ops/sec ±1.79% (97 runs sampled)
Fastest is [ 'Drip' ]
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 31,286,214 ops/sec ±1.12% (99 runs sampled)
EventEmitter2 x 49,090,827 ops/sec ±1.07% (100 runs sampled)
EventEmitter3 x 74,707,517 ops/sec ±0.26% (101 runs sampled)
Drip x 61,478,990 ops/sec ±3.58% (92 runs sampled)
event-emitter x 20,533,357 ops/sec ±1.50% (96 runs sampled)
contra/emitter x 3,468,331 ops/sec ±1.51% (97 runs sampled)
tsee x 21,411,666 ops/sec ±1.83% (95 runs sampled)
tseep x 152,687,444 ops/sec ±0.84% (98 runs sampled)
tseep safe x 202,659,602 ops/sec ±1.49% (98 runs sampled)
emitix x 104,333,715 ops/sec ±1.56% (94 runs sampled)
mitt x 8,330,907 ops/sec ±2.27% (95 runs sampled)
Fastest is [ 'tseep safe' ]
```

Starting benchmark context.js

```
EventEmitter1 x 20,227,884 ops/sec ±1.78% (100 runs sampled)
EventEmitter2 x 15,940,175 ops/sec ±3.19% (98 runs sampled)
EventEmitter3 x 23,964,695 ops/sec ±3.85% (95 runs sampled)
Drip x 18,808,039 ops/sec ±0.72% (92 runs sampled)
fastemitter x 15,192,332 ops/sec ±0.34% (97 runs sampled)
event-emitter x 10,967,161 ops/sec ±1.09% (96 runs sampled)
contra/emitter x 2,897,722 ops/sec ±0.99% (97 runs sampled)
tsee x 12,036,649 ops/sec ±2.04% (95 runs sampled)
tseep x 199,542,850 ops/sec ±3.04% (93 runs sampled)
tseep safe x 90,772,883 ops/sec ±1.31% (99 runs sampled)
emitix x 57,452,717 ops/sec ±3.50% (99 runs sampled)
mitt x 8,568,132 ops/sec ±3.67% (91 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark once.js

```
EventEmitter1 x 16,035,549 ops/sec ±0.98% (94 runs sampled)
EventEmitter2 x 7,398,566 ops/sec ±2.42% (94 runs sampled)
EventEmitter3 x 50,132,769 ops/sec ±1.07% (91 runs sampled)
Drip x 31,517,264 ops/sec ±4.08% (87 runs sampled)
fastemitter x 21,714,870 ops/sec ±1.85% (97 runs sampled)
event-emitter x 8,444,641 ops/sec ±3.35% (96 runs sampled)
contra/emitter x 8,316,486 ops/sec ±2.26% (93 runs sampled)
tseep x 106,419,614 ops/sec ±1.22% (101 runs sampled)
tseep safe x 107,922,538 ops/sec ±1.09% (101 runs sampled)
emitix x 74,845,830 ops/sec ±9.28% (95 runs sampled)
Fastest is [ 'tseep safe' ]
```

Starting benchmark add-remove.js

```
EventEmitter1 x 26,440,758 ops/sec ±1.79% (97 runs sampled)
EventEmitter2 x 9,810,428 ops/sec ±1.47% (95 runs sampled)
EventEmitter3 x 109,124,056 ops/sec ±3.15% (92 runs sampled)
Drip x 150,639,297 ops/sec ±1.43% (95 runs sampled)
fastemitter x 68,882,191 ops/sec ±1.90% (98 runs sampled)
event-emitter x 16,738,244 ops/sec ±2.15% (95 runs sampled)
contra/emitter x 28,961,654 ops/sec ±0.58% (99 runs sampled)
tsee x 30,231,150 ops/sec ±2.41% (94 runs sampled)
tseep x 68,889,022 ops/sec ±1.29% (97 runs sampled)
tseep bound x 8,870,044 ops/sec ±12.76% (70 runs sampled)
tseep safe x 107,768,364 ops/sec ±0.92% (97 runs sampled)
emitix x 125,387,359 ops/sec ±0.99% (97 runs sampled)
mitt x 20,767,519 ops/sec ±2.09% (93 runs sampled)
Fastest is [ 'Drip' ]
```
