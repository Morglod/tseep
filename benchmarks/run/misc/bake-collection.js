'use strict';

const { bakeCollection, bakeCollectionVariadic } = require('../../../lib/task-collection/bake-collection');

const steps = [ 10, 100, 500, 1000, 1500, 2000, 3000, 4000, 5000, 10000 ];

function makeFuncsArray(size) {
    const a = Array.from({ length: size });
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

const funcCollection = makeFuncsArray(10000);

var benchmark = require('benchmark');
var suite = new benchmark.Suite();

for (let i = 0; i < steps.length; ++i) {
    const funcs = funcCollection.slice(0, steps[i]);
    const a = funcs.length % 4, b = 10;
    const baked = bakeCollection(funcs, 2);
    const bakedVariadic = bakeCollectionVariadic(funcs);

    suite.add('for_' + steps[i], function() {
        for (let j = 0; j < funcs.length; ++j) {
            funcs[j](a, b);
        }
    });

    suite.add('bake_and_call_fixed_' + steps[i], function() {
        const baked = bakeCollection(funcs, 2);
        baked(a, b);
    });

    suite.add('call_baked_fixed_' + steps[i], function() {
        baked(a, b);
    });

    suite.add('bake_and_call_var_' + steps[i], function() {
        const baked = bakeCollectionVariadic(funcs);
        baked(a, b);
    });

    suite.add('call_baked_var_' + steps[i], function() {
        bakedVariadic(a, b);
    });
}

suite
.on('cycle', function cycle(e) {
    console.log(e.target.toString());
}).on('complete', function completed() {
    console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
