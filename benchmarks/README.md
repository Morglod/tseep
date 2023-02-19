node v16.13.0
macbook pro m1

> benchmarks@0.0.0 benchmark /Users/morglod/Desktop/Dev/tseep/benchmarks
> find run -name '\*.js' -exec ./start.sh {} \;
> Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 4,606,835 ops/sec ±0.40% (95 runs sampled)
EventEmitter2 x 4,662,919 ops/sec ±0.32% (94 runs sampled)
EventEmitter3 x 5,957,344 ops/sec ±0.06% (100 runs sampled)
fastemitter x 6,195,020 ops/sec ±0.06% (98 runs sampled)
event-emitter x 3,592,239 ops/sec ±0.08% (100 runs sampled)
contra/emitter x 2,203,724 ops/sec ±0.15% (99 runs sampled)
tsee x 5,225,100 ops/sec ±0.11% (101 runs sampled)
tseep x 40,667,737 ops/sec ±0.06% (98 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark emit-multi.js

```
EventEmitter1 x 28,285,587 ops/sec ±0.12% (98 runs sampled)
EventEmitter2 x 11,656,902 ops/sec ±0.21% (100 runs sampled)
EventEmitter3 x 13,666,947 ops/sec ±0.23% (97 runs sampled)
Drip x 12,310,627 ops/sec ±0.26% (100 runs sampled)
fastemitter x 10,806,921 ops/sec ±0.14% (99 runs sampled)
event-emitter x 9,090,742 ops/sec ±0.84% (94 runs sampled)
contra/emitter x 3,370,818 ops/sec ±1.08% (95 runs sampled)
tsee x 9,164,591 ops/sec ±0.47% (87 runs sampled)
tseep x 155,795,680 ops/sec ±0.18% (99 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark once-multi.js

```
EventEmitter1 x 1,635,602 ops/sec ±0.42% (95 runs sampled)
EventEmitter2 x 1,118,738 ops/sec ±0.57% (98 runs sampled)
EventEmitter3 x 5,210,336 ops/sec ±0.40% (94 runs sampled)
Drip:
fastemitter x 1,311,599 ops/sec ±0.40% (99 runs sampled)
event-emitter x 734,536 ops/sec ±0.30% (92 runs sampled)
contra/emitter x 1,963,925 ops/sec ±0.24% (86 runs sampled)
tseep x 17,730,292 ops/sec ±0.28% (101 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark emit-empty.js

```
EventEmitter1 x 32,021,375 ops/sec ±0.15% (97 runs sampled)
EventEmitter2 x 46,886,035 ops/sec ±0.14% (97 runs sampled)
EventEmitter3 x 85,284,921 ops/sec ±0.16% (91 runs sampled)
Drip x 61,343,290 ops/sec ±0.23% (100 runs sampled)
fastemitter x 80,105,481 ops/sec ±0.30% (95 runs sampled)
event-emitter x 35,029,426 ops/sec ±0.25% (100 runs sampled)
contra/emitter x 3,385,890 ops/sec ±0.77% (95 runs sampled)
tsee x 23,241,141 ops/sec ±0.75% (95 runs sampled)
tseep x 1,020,742,305 ops/sec ±0.11% (97 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark hundreds.js

```
EventEmitter1 x 686,369 ops/sec ±0.34% (95 runs sampled)
EventEmitter2 x 596,125 ops/sec ±0.50% (99 runs sampled)
EventEmitter3 x 750,899 ops/sec ±0.54% (88 runs sampled)
Drip x 960,943 ops/sec ±0.09% (102 runs sampled)
fastemitter x 827,007 ops/sec ±0.29% (98 runs sampled)
event-emitter x 622,057 ops/sec ±0.23% (94 runs sampled)
contra/emitter x 449,800 ops/sec ±0.23% (98 runs sampled)
tsee x 1,221,465 ops/sec ±0.19% (98 runs sampled)
tseep x 2,058,262 ops/sec ±0.17% (97 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark listeners.js

```
EventEmitter1 x 27,616,610 ops/sec ±0.63% (91 runs sampled)
EventEmitter3 x 28,478,965 ops/sec ±0.39% (98 runs sampled)
fastemitter x 11,725,490 ops/sec ±0.60% (91 runs sampled)
tsee x 26,513,409 ops/sec ±0.48% (94 runs sampled)
tseep x 68,296,102 ops/sec ±0.46% (98 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark emit.js

```
EventEmitter1 x 16,711,400 ops/sec ±0.07% (102 runs sampled)
EventEmitter2 x 11,568,363 ops/sec ±0.10% (99 runs sampled)
EventEmitter3 x 14,592,235 ops/sec ±0.20% (100 runs sampled)
Drip x 14,941,250 ops/sec ±0.30% (87 runs sampled)
fastemitter x 11,907,338 ops/sec ±0.21% (99 runs sampled)
event-emitter x 9,645,743 ops/sec ±0.45% (91 runs sampled)
contra/emitter x 2,934,900 ops/sec ±0.12% (100 runs sampled)
tsee x 11,548,047 ops/sec ±0.47% (98 runs sampled)
tseep x 154,630,216 ops/sec ±0.15% (93 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark init.js

```
EventEmitter1 x 61,336,877 ops/sec ±0.60% (92 runs sampled)
EventEmitter2 x 120,631,678 ops/sec ±1.95% (95 runs sampled)
EventEmitter3 x 158,849,766 ops/sec ±0.55% (98 runs sampled)
Drip x 237,831,898 ops/sec ±0.58% (91 runs sampled)
fastemitter x 55,560,409 ops/sec ±0.41% (87 runs sampled)
event-emitter x 118,758,859 ops/sec ±0.18% (98 runs sampled)
contra/emitter x 34,806,347 ops/sec ±0.20% (96 runs sampled)
tsee x 16,091,147 ops/sec ±0.19% (96 runs sampled)
tseep x 11,103,929 ops/sec ±0.31% (100 runs sampled)
Fastest is [ 'Drip' ]
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 31,270,140 ops/sec ±0.14% (96 runs sampled)
EventEmitter2 x 46,581,669 ops/sec ±0.15% (101 runs sampled)
EventEmitter3 x 75,877,415 ops/sec ±0.21% (93 runs sampled)
Drip x 61,483,894 ops/sec ±0.09% (98 runs sampled)
event-emitter x 19,807,819 ops/sec ±0.15% (100 runs sampled)
contra/emitter x 3,382,642 ops/sec ±0.25% (91 runs sampled)
tsee x 22,577,975 ops/sec ±0.18% (99 runs sampled)
tseep x 154,343,309 ops/sec ±0.12% (92 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark context.js

```
EventEmitter1 x 19,699,356 ops/sec ±0.29% (96 runs sampled)
EventEmitter2 x 16,037,441 ops/sec ±0.27% (96 runs sampled)
EventEmitter3 x 25,450,135 ops/sec ±0.27% (100 runs sampled)
Drip x 18,767,010 ops/sec ±0.26% (87 runs sampled)
fastemitter x 15,346,221 ops/sec ±0.19% (101 runs sampled)
event-emitter x 10,934,032 ops/sec ±0.13% (98 runs sampled)
contra/emitter x 2,975,600 ops/sec ±0.15% (97 runs sampled)
tsee x 12,478,143 ops/sec ±0.13% (99 runs sampled)
tseep x 194,220,840 ops/sec ±0.13% (100 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark once.js

```
EventEmitter1 x 16,347,634 ops/sec ±0.22% (97 runs sampled)
EventEmitter2 x 7,377,611 ops/sec ±0.11% (96 runs sampled)
EventEmitter3 x 51,853,273 ops/sec ±0.35% (97 runs sampled)
Drip x 36,882,152 ops/sec ±0.26% (94 runs sampled)
fastemitter x 19,700,971 ops/sec ±1.77% (93 runs sampled)
event-emitter x 8,785,399 ops/sec ±0.11% (99 runs sampled)
contra/emitter x 8,563,304 ops/sec ±0.13% (97 runs sampled)
tseep x 107,708,167 ops/sec ±0.12% (100 runs sampled)
Fastest is [ 'tseep' ]
```

Starting benchmark add-remove.js

```
EventEmitter1 x 27,782,136 ops/sec ±0.70% (91 runs sampled)
EventEmitter2 x 9,487,404 ops/sec ±0.43% (97 runs sampled)
EventEmitter3 x 101,122,501 ops/sec ±1.41% (91 runs sampled)
Drip x 153,366,552 ops/sec ±0.11% (102 runs sampled)
fastemitter x 67,576,713 ops/sec ±0.26% (99 runs sampled)
event-emitter x 16,994,968 ops/sec ±0.16% (94 runs sampled)
contra/emitter x 27,647,339 ops/sec ±0.12% (99 runs sampled)
tsee x 29,781,303 ops/sec ±0.16% (99 runs sampled)
tseep x 70,724,472 ops/sec ±0.11% (101 runs sampled)
Fastest is [ 'Drip' ]
```
