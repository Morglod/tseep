import { EventEmitter } from '..';

it('works with ES6 symbols', function (next) {
    var e = new EventEmitter()
        , event = Symbol('cows')
        , unknown = Symbol('moo');

    e.on(event, function foo(arg) {

        expect(e.listenerCount(unknown)).toBe(0);
        expect(e.listeners(unknown)).toMatchObject([]);
        expect(arg).toBe('bar');

        function bar(onced) {
            expect(e.listenerCount(unknown)).toBe(0);
            expect(e.listeners(unknown)).toMatchObject([]);
            expect(onced).toBe('foo');
            next();
        }

        e.once(unknown, bar);

        expect(e.listenerCount(event)).toBe(1);
        expect(e.listeners(event)).toMatchObject([foo]);
        expect(e.listenerCount(unknown)).toBe(1);
        expect(e.listeners(unknown)).toMatchObject([bar]);

        e.removeAllListeners(event);

        expect(e.listenerCount(event)).toBe(0);
        expect(e.listeners(event)).toMatchObject([]);
        expect(e.emit(unknown, 'foo')).toBe(true);
    });

    expect(e.emit(unknown, 'bar')).toBe(false);
    expect(e.emit(event, 'bar')).toBe(true);
});