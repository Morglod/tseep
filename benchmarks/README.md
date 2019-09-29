
> benchmarks@0.0.0 benchmark /Users/morglod/Desktop/Dev/tseep/benchmarks
> find run -name '*.js' -exec ./start.sh {} \;

Starting benchmark emit-empty.js

```
EventEmitter1 x 15,500,386 ops/sec ±0.43% (87 runs sampled)
EventEmitter2 x 24,980,637 ops/sec ±0.98% (86 runs sampled)
EventEmitter3 x 26,440,519 ops/sec ±0.42% (89 runs sampled)
Drip x 24,441,496 ops/sec ±0.54% (90 runs sampled)
fastemitter x 32,022,949 ops/sec ±0.39% (90 runs sampled)
event-emitter x 28,823,595 ops/sec ±0.36% (90 runs sampled)
contra/emitter x 614,979 ops/sec ±0.35% (91 runs sampled)
tsee x 10,641,840 ops/sec ±1.14% (88 runs sampled)
tseep x 674,363,710 ops/sec ±0.68% (88 runs sampled)
Fastest is tseep
```

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 3,927,837 ops/sec ±0.88% (88 runs sampled)
EventEmitter2 x 2,066,298 ops/sec ±0.85% (85 runs sampled)
EventEmitter3 x 4,806,892 ops/sec ±0.36% (90 runs sampled)
fastemitter x 3,588,278 ops/sec ±0.57% (87 runs sampled)
event-emitter x 1,669,402 ops/sec ±0.36% (87 runs sampled)
contra/emitter x 502,067 ops/sec ±0.63% (88 runs sampled)
tsee x 3,176,189 ops/sec ±0.52% (90 runs sampled)
tseep x 45,807,343 ops/sec ±0.42% (89 runs sampled)
Fastest is tseep
```

Starting benchmark emit-multi.js

```
EventEmitter1 x 10,895,745 ops/sec ±0.51% (88 runs sampled)
EventEmitter2 x 6,702,723 ops/sec ±0.52% (83 runs sampled)
EventEmitter3 x 8,581,803 ops/sec ±0.34% (90 runs sampled)
Drip x 6,668,585 ops/sec ±0.66% (89 runs sampled)
fastemitter x 5,635,121 ops/sec ±0.42% (89 runs sampled)
event-emitter x 5,077,052 ops/sec ±0.38% (90 runs sampled)
contra/emitter x 638,549 ops/sec ±0.54% (90 runs sampled)
tsee x 5,190,237 ops/sec ±0.50% (88 runs sampled)
tseep x 24,368,875 ops/sec ±0.27% (88 runs sampled)
Fastest is tseep
```

Starting benchmark once-multi.js

```
EventEmitter1 x 867,396 ops/sec ±1.99% (88 runs sampled)
EventEmitter2 x 373,404 ops/sec ±0.90% (81 runs sampled)
EventEmitter3 x 3,665,920 ops/sec ±0.35% (88 runs sampled)
Drip: 
fastemitter x 373,265 ops/sec ±0.25% (75 runs sampled)
event-emitter x 323,457 ops/sec ±0.63% (87 runs sampled)
contra/emitter x 480,065 ops/sec ±0.27% (88 runs sampled)
tseep x 6,427,551 ops/sec ±0.29% (89 runs sampled)
Fastest is tseep
```

Starting benchmark hundreds.js

```
EventEmitter1 x 522,193 ops/sec ±1.26% (88 runs sampled)
EventEmitter2 x 267,286 ops/sec ±0.55% (89 runs sampled)
EventEmitter3 x 564,812 ops/sec ±0.37% (91 runs sampled)
Drip x 523,073 ops/sec ±0.54% (85 runs sampled)
fastemitter x 578,505 ops/sec ±0.38% (88 runs sampled)
event-emitter x 319,069 ops/sec ±4.20% (83 runs sampled)
contra/emitter x 172,678 ops/sec ±2.37% (86 runs sampled)
tsee x 366,594 ops/sec ±1.73% (83 runs sampled)
tseep x 759,296 ops/sec ±2.99% (83 runs sampled)
Fastest is tseep
```

Starting benchmark listeners.js

```
EventEmitter1 x 13,520,544 ops/sec ±5.27% (81 runs sampled)
EventEmitter3 x 14,794,988 ops/sec ±3.44% (81 runs sampled)
fastemitter x 7,941,424 ops/sec ±2.80% (85 runs sampled)
tsee x 20,039,420 ops/sec ±1.39% (81 runs sampled)
tseep x 21,154,114 ops/sec ±1.03% (88 runs sampled)
Fastest is tseep
```

Starting benchmark emit.js

```
EventEmitter1 x 9,448,956 ops/sec ±0.41% (86 runs sampled)
EventEmitter2 x 9,332,824 ops/sec ±0.52% (88 runs sampled)
EventEmitter3 x 21,682,736 ops/sec ±0.32% (87 runs sampled)
Drip x 9,598,815 ops/sec ±0.44% (91 runs sampled)
fastemitter x 7,507,286 ops/sec ±0.57% (88 runs sampled)
event-emitter x 6,262,404 ops/sec ±0.41% (90 runs sampled)
contra/emitter x 551,814 ops/sec ±0.64% (87 runs sampled)
tsee x 5,830,302 ops/sec ±0.35% (87 runs sampled)
tseep x 88,485,652 ops/sec ±0.25% (89 runs sampled)
Fastest is tseep
```

Starting benchmark init.js

```
EventEmitter1 x 18,222,982 ops/sec ±2.74% (88 runs sampled)
EventEmitter2 x 22,012,832 ops/sec ±0.51% (78 runs sampled)
EventEmitter3 x 26,113,216 ops/sec ±0.64% (83 runs sampled)
Drip x 34,769,210 ops/sec ±0.58% (85 runs sampled)
fastemitter x 17,913,406 ops/sec ±0.21% (86 runs sampled)
event-emitter x 28,746,448 ops/sec ±1.75% (85 runs sampled)
contra/emitter x 12,250,810 ops/sec ±0.76% (85 runs sampled)
tsee x 4,701,422 ops/sec ±0.76% (85 runs sampled)
tseep x 15,541,457 ops/sec ±0.51% (88 runs sampled)
Fastest is Drip
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 10,297,057 ops/sec ±0.42% (85 runs sampled)
EventEmitter2 x 10,041,541 ops/sec ±0.44% (89 runs sampled)
EventEmitter3 x 20,643,835 ops/sec ±0.27% (89 runs sampled)
Drip x 10,269,659 ops/sec ±0.52% (90 runs sampled)
event-emitter x 6,760,002 ops/sec ±0.45% (88 runs sampled)
contra/emitter x 555,101 ops/sec ±0.49% (90 runs sampled)
tsee x 6,191,897 ops/sec ±0.44% (84 runs sampled)
tseep x 88,247,706 ops/sec ±0.44% (88 runs sampled)
Fastest is tseep
```

Starting benchmark context.js

```
EventEmitter1 x 9,392,533 ops/sec ±0.44% (87 runs sampled)
EventEmitter2 x 8,999,200 ops/sec ±1.53% (87 runs sampled)
EventEmitter3 x 20,818,668 ops/sec ±0.43% (86 runs sampled)
Drip x 9,413,749 ops/sec ±0.32% (90 runs sampled)
fastemitter x 7,482,215 ops/sec ±0.42% (87 runs sampled)
event-emitter x 6,242,804 ops/sec ±0.43% (88 runs sampled)
contra/emitter x 555,439 ops/sec ±0.42% (87 runs sampled)
tsee x 5,732,235 ops/sec ±0.37% (89 runs sampled)
tseep x 65,607,904 ops/sec ±0.32% (91 runs sampled)
Fastest is tseep
```

Starting benchmark once.js

```
EventEmitter1 x 7,860,073 ops/sec ±1.85% (86 runs sampled)
EventEmitter2 x 5,174,465 ops/sec ±1.99% (76 runs sampled)
EventEmitter3 x 20,038,077 ops/sec ±0.61% (86 runs sampled)
Drip x 16,907,934 ops/sec ±0.32% (86 runs sampled)
fastemitter x 11,748,120 ops/sec ±0.79% (87 runs sampled)
event-emitter x 4,375,434 ops/sec ±0.26% (89 runs sampled)
contra/emitter x 2,244,337 ops/sec ±0.30% (91 runs sampled)
tseep x 19,477,372 ops/sec ±0.26% (87 runs sampled)
Fastest is EventEmitter3
```

Starting benchmark add-remove.js

```
EventEmitter1 x 14,444,000 ops/sec ±1.80% (88 runs sampled)
EventEmitter2 x 10,426,286 ops/sec ±1.56% (79 runs sampled)
EventEmitter3 x 20,970,753 ops/sec ±0.60% (85 runs sampled)
Drip x 129,254,608 ops/sec ±0.80% (85 runs sampled)
fastemitter x 33,024,095 ops/sec ±0.63% (86 runs sampled)
event-emitter x 8,318,856 ops/sec ±0.55% (90 runs sampled)
contra/emitter x 9,063,150 ops/sec ±1.13% (85 runs sampled)
tsee x 8,411,035 ops/sec ±0.38% (90 runs sampled)
tseep x 29,363,145 ops/sec ±3.46% (85 runs sampled)
Fastest is Drip
```

