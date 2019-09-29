import { EventEmitter } from './index';

const events = new EventEmitter<{
    foo: (a: number, b: string) => void,
    boo: (a: string) => void,
}>();

const f1 = (a, b) => {
    console.log('foo:', a, b);
};

const f2 = (a, b) => {
    console.log('foo:', a, b);
};
const f3 = (a, b) => {
    console.log('foo:', a, b);
};
events.on('foo', f1);

events.on('foo', f2);

events.on('foo', f3);

events.once('boo', (a) => {
    console.log('boo:', a);
});

// events.emit('foo', 123, 'hello');
// events.emit('boo', 'hello');

events.off('foo', f3);
events.off('foo', f2);
events.off('foo', f1);

console.log(events);
console.log(events.listeners('foo'));