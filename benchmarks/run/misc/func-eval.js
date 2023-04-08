'use strict';

var benchmark = require('benchmark');

(
    new benchmark.Suite()
)
.add('eval', function() {
    const f = eval('(function (arr) { return arr.reduce((sum, x) => sum + x, 0); })');
    for (let i = 0; i < 2; ++i) {
        f([ 10, 4, 8, i + 2 ]);
    }
})
.add('Function()', function() {
    const f = Function('arr', 'return arr.reduce((sum, x) => sum + x, 0);');
    for (let i = 0; i < 2; ++i) {
        f([ 10, 4, 8, i + 2 ]);
    }
})
.add('new Function()', function() {
    const f = new Function('arr', 'return arr.reduce((sum, x) => sum + x, 0);');
    for (let i = 0; i < 2; ++i) {
        f([ 10, 4, 8, i + 2 ]);
    }
})
.on('cycle', function cycle(e) {
    console.log(e.target.toString());
}).on('complete', function completed() {
    console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
