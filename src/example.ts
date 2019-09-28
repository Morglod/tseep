import { EventEmitter } from './index';

const events = new EventEmitter<{
    foo: (a: number, b: string) => void,
    boo: (a: string) => void,
}>();

events.on('foo', (a, b) => {
    console.log('foo:', a, b);
});

events.on('boo', (a) => {
    console.log('boo:', a);
});

events.emit('foo', 123, 'hello');
events.emit('boo', 'hello');