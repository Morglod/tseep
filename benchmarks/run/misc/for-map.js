'use strict';

var benchmark = require('benchmark');

(
    new benchmark.Suite()
)
.add('for', function() {
    const len = 100;
    let s = '';
    for (let i = 0; i < len - 1; ++i) {
        s += (i % 4).toString() + ', ';
    }
    s += ((len - 1) % 4).toString();
})
.add('map join', function() {
    const len = 100;
    let s = Array.from({ length: len }).map((_, i) => `${i % 4}`).join(', ');
})
.on('cycle', function cycle(e) {
    console.log(e.target.toString());
}).on('complete', function completed() {
    console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
