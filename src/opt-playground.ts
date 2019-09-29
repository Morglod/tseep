import * as tseep from './';

const ee = new tseep.EventEmitter();

function handler(a: any,b: any,c: any) {
    if (arguments.length > 10) throw new Error('aaa');
}

for (let i = 0; i < 9999999999; ++i) {
    for (let j = 0; j < 99999; ++j) {
        ee.on('foo', handler);
    }
    for (let j = 0; j < 99999; ++j) {
        ee.off('foo', handler);
    }
}

console.log('ok');