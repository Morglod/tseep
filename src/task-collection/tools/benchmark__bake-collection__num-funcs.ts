import { bakeCollection } from "../bake-collection";

const steps = [ 10, 100, 500, 1000, 1500, 2000, 3000, 4000, 5000, 10000  ];
const callTimes = 20;

function makeFuncsArray(size: number): ((x: number, y: number) => number)[] {
    const a = Array(size);
    for (let i = 0; i < size; ++i) {
        a[i] = eval(`
            (function (x, y) {
                let zx = 11;
                for (let j = 0; j < 10; ++j) {
                    zx += j + x * y + ${(Math.random() * 100).toFixed(0)};
                }
                return zx;
            })
        `);
    }

    return a;
}

// -----------------

// Warm up memory

const predefined_funcs = makeFuncsArray(steps[steps.length - 1]);


let _prevHeapUsed = process.memoryUsage().heapUsed;
function nextHeapUsed() {
    const cur = process.memoryUsage().heapUsed;
    const x = cur - _prevHeapUsed;
    _prevHeapUsed = cur;
    return x;
}

// -----------------

function benchForI() {
    console.log('\narray, forI loop:');
    console.log(`funcs num\t| bake time \t| first call time\t| call time\t| heap change\t| total time\n`);
    
    for (let stepi = 0; stepi < steps.length; stepi++) {
        // global.gc();

        const funcs = predefined_funcs.slice(0, steps[stepi]);
    
        const bakeStart = process.hrtime();
        const baked = (x: number, y: number) => {
            for (let jj = 0; jj < funcs.length; ++jj) {
                funcs[jj](x, y);
            }
        };
        const bakeTime = process.hrtime(bakeStart);

        // global.gc();
    
        const firstCallStart = process.hrtime();
        baked(10, 5);
        const firstCallTime = process.hrtime(firstCallStart);
        baked(10, 5);
        
        const callStart = process.hrtime();
        for (let i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        const callTime = process.hrtime(callStart);

        const totalTime = (bakeTime[1] / 1000000) + (callTime[1] / 1000000);
    
        console.log(`${steps[stepi]}\t\t| ${bakeTime[1] / 1000000} ms\t| ${firstCallTime[1] / 1000000} ms\t\t| ${callTime[1] / 1000000} ms\t| ${(nextHeapUsed() / 1024 / 1024).toFixed(3)} mb\t|${totalTime}ms`);
    }
}

function benchBake() {
    console.log('\nbakeCollection:');
    console.log(`funcs num\t| bake time \t| first call time\t| call time\t| heap change\t| total time\n`);
    
    for (let stepi = 0; stepi < steps.length; stepi++) {
        // global.gc();

        const funcs = predefined_funcs.slice(0, steps[stepi]);
    
        const bakeStart = process.hrtime();
        const baked = bakeCollection(funcs, 2);
        const bakeTime = process.hrtime(bakeStart);
    
        // global.gc();

        const firstCallStart = process.hrtime();
        baked(10, 5);
        const firstCallTime = process.hrtime(firstCallStart);
        baked(10, 5);
    
        const callStart = process.hrtime();
        for (let i = 0; i < callTimes; ++i) {
            baked(10, 5);
        }
        const callTime = process.hrtime(callStart);
    
        const totalTime = (bakeTime[1] / 1000000) + (callTime[1] / 1000000);

        console.log(`${steps[stepi]}\t\t| ${bakeTime[1] / 1000000} ms\t| ${firstCallTime[1] / 1000000} ms\t\t| ${callTime[1] / 1000000} ms\t| ${(nextHeapUsed() / 1024 / 1024).toFixed(3)} mb\t|${totalTime}ms`);
    }
}

// global.gc();
benchForI();
// global.gc();
benchBake();