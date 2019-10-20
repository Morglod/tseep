import { EventEmitter } from '..';
import assume from 'assume';

describe('EventEmitter', function tests() {
    'use strict';
    
      it('inherits when used with `require("util").inherits`', function () {
        function Beast() {
          EventEmitter.call(this);
        }
    
        require('util').inherits(Beast, EventEmitter);
    
        var moop = new Beast()
          , meap = new Beast();
    
        assume(moop).is.instanceOf(Beast);
        assume(moop).is.instanceOf(EventEmitter);
    
        moop.listeners();
        meap.listeners();
    
        moop.on('data', function () {
          throw new Error('I should not emit');
        });
    
        meap.emit('data', 'rawr');
        meap.removeListener('foo');
        meap.removeAllListeners();
      });
    if ('undefined' !== typeof Symbol) it('works with ES6 symbols', function (next) {
      var e = new EventEmitter()
        , event = Symbol('cows')
        , unknown = Symbol('moo');
  
      e.on(event, function foo(arg) {
        assume(e.listenerCount(unknown)).equals(0);
        assume(e.listeners(unknown)).deep.equals([]);
        assume(arg).equals('bar');
  
        function bar(onced) {
          assume(e.listenerCount(unknown)).equals(0);
          assume(e.listeners(unknown)).deep.equals([]);
          assume(onced).equals('foo');
          next();
        }
  
        e.once(unknown, bar);
  
        assume(e.listenerCount(event)).equals(1);
        assume(e.listeners(event)).deep.equals([foo]);
        assume(e.listenerCount(unknown)).equals(1);
        assume(e.listeners(unknown)).deep.equals([bar]);
  
        e.removeAllListeners(event);
  
        assume(e.listenerCount(event)).equals(0);
        assume(e.listeners(event)).deep.equals([]);
        assume(e.emit(unknown, 'foo')).equals(true);
      });
  
      assume(e.emit(unknown, 'bar')).equals(false);
      assume(e.emit(event, 'bar')).equals(true);
    });
  
    describe('EventEmitter#emit', function () {
      it('should return false when there are not events to emit', function () {
        var e = new EventEmitter();
  
        assume(e.emit('foo')).equals(false);
        assume(e.emit('bar')).equals(false);
      });
  
      it('emits with context', function (done) {
        var context = { bar: 'baz' }
          , e = new EventEmitter();
  
        e.on('foo', function (bar) {
          assume(bar).equals('bar');
          assume(this).equals(context);
  
          done();
        }.bind(context)).emit('foo', 'bar');
      });
  
      it('emits with context, multiple arguments (force apply)', function (done) {
        var context = { bar: 'baz' }
          , e = new EventEmitter();
  
        e.on('foo', function (bar) {
          assume(bar).equals('bar');
          assume(this).equals(context);
  
          done();
        }.bind(context)).emit('foo', 'bar', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
      });
  
      // it('can emit the function with multiple arguments', function () {
      //   var e = new EventEmitter();
  
      //   for (var i = 0; i < 100; i++) {
      //     (function (j) {
      //       for (var i = 0, args = []; i < j; i++) {
      //         args.push(j);
      //       }
  
      //       e.once('args', function () {
      //         assume(arguments.length).equals(args.length);
      //       });
  
      //       e.emit.apply(e, ['args'].concat(args));
      //     })(i);
      //   }
      // });
  
      // it('can emit the function with multiple arguments, multiple listeners', function () {
      //   var e = new EventEmitter();
  
      //   for (var i = 0; i < 100; i++) {
      //     (function (j) {
      //       for (var i = 0, args = []; i < j; i++) {
      //         args.push(j);
      //       }
  
      //       e.once('args', function () {
      //         assume(arguments.length).equals(args.length);
      //       });
  
      //       e.once('args', function () {
      //         assume(arguments.length).equals(args.length);
      //       });
  
      //       e.once('args', function () {
      //         assume(arguments.length).equals(args.length);
      //       });
  
      //       e.once('args', function () {
      //         assume(arguments.length).equals(args.length);
      //       });
  
      //       e.emit.apply(e, ['args'].concat(args));
      //     })(i);
      //   }
      // });
  
      it('emits with context, multiple listeners (force loop)', function () {
        var e = new EventEmitter();
  
        e.on('foo', function (bar) {
          assume(this).eqls({ foo: 'bar' });
          assume(bar).equals('bar');
        }.bind({ foo: 'bar' }));
  
        e.on('foo', function (bar) {
          assume(this).eqls({ bar: 'baz' });
          assume(bar).equals('bar');
        }.bind({ bar: 'baz' }));
  
        e.emit('foo', 'bar');
      });
  
      it('emits with different contexts', function () {
        var e = new EventEmitter()
          , pattern = '';
  
        function writer() {
          pattern += this;
        }
  
        e.on('write', writer.bind('foo'));
        e.on('write', writer.bind('baz'));
        e.once('write', writer.bind('bar'));
        e.once('write', writer.bind('banana'));
  
        e.emit('write');
        assume(pattern).equals('foobazbarbanana');
      });
  
      it('should return true when there are events to emit', function () {
        var e = new EventEmitter()
          , called = 0;
  
        e.on('foo', function () {
          called++;
        });
  
        assume(e.emit('foo')).equals(true);
        assume(e.emit('foob')).equals(false);
        assume(called).equals(1);
      });
  
      it('receives the emitted events', function (done) {
        var e = new EventEmitter();
  
        e.on('data', function (a, b, c, d, undef) {
          assume(a).equals('foo');
          assume(b).equals(e);
          assume(c).is.instanceOf(Date);
          assume(undef).equals(undefined);
          // assume(arguments.length).equals(3);
  
          done();
        });
  
        e.emit('data', 'foo', e, new Date());
      });
  
      it('emits to all event listeners', function () {
        var e = new EventEmitter()
          , pattern = [];
  
        e.on('foo', function () {
          pattern.push('foo1');
        });
  
        e.on('foo', function () {
          pattern.push('foo2');
        });
  
        e.emit('foo');
  
        assume(pattern.join(';')).equals('foo1;foo2');
      });
  
      (function each(keys) {
        var key = keys.shift();
  
        if (!key) return;
  
        it('can store event which is a known property: '+ key, function (next) {
          var e = new EventEmitter();
  
          e.on(key, function (k) {
            assume(k).equals(key);
            next();
          }).emit(key, key);
        });
  
        each(keys);
      })([
        'hasOwnProperty',
        'constructor',
        '__proto__',
        'toString',
        'toValue',
        'unwatch',
        'watch'
      ]);
    });
  
    describe('EventEmitter#listeners', function () {
      it('returns an empty array if no listeners are specified', function () {
        var e = new EventEmitter();
  
        assume(e.listeners('foo')).is.a('array');
        assume(e.listeners('foo').length).equals(0);
      });
  
      it('returns an array of function', function () {
        var e = new EventEmitter();
  
        function foo() {}
  
        e.on('foo', foo);
        assume(e.listeners('foo')).is.a('array');
        assume(e.listeners('foo').length).equals(1);
        assume(e.listeners('foo')).deep.equals([foo]);
      });
  
      it('is not vulnerable to modifications', function () {
        var e = new EventEmitter();
  
        function foo() {}
  
        e.on('foo', foo);
  
        assume(e.listeners('foo')).deep.equals([foo]);
  
        e.listeners('foo').length = 0;
        assume(e.listeners('foo')).deep.equals([foo]);
      });
    });
  
    describe('EventEmitter#listenerCount', function () {
      it('returns the number of listeners for a given event', function () {
        var e = new EventEmitter();
  
        assume(e.listenerCount('foo')).equals(0);
  
        e.on('foo', function () {});
        assume(e.listenerCount('foo')).equals(1);
        e.on('foo', function () {});
        assume(e.listenerCount('foo')).equals(2);
      });
    });
  
    describe('EventEmitter#on', function () {
      it('throws an error if the listener is not a function', function () {
        var e = new EventEmitter();
  
        try {
          e.on('foo', 'bar' as any);
        } catch (ex) {
          assume(ex).is.instanceOf(TypeError);
          assume(ex.message).equals('The listener must be a function');
          return;
        }
  
        throw new Error('oops');
      });
    });
  
    describe('EventEmitter#once', function () {
      it('only emits it once', function () {
        var e = new EventEmitter()
          , calls = 0;
  
        e.once('foo', function () {
          calls++;
        });
  
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
  
        assume(e.listeners('foo').length).equals(0);
        assume(calls).equals(1);
      });
  
      it('only emits once if emits are nested inside the listener', function () {
        var e = new EventEmitter()
          , calls = 0;
  
        e.once('foo', function () {
          calls++;
          e.emit('foo');
        });
  
        e.emit('foo');
        assume(e.listeners('foo').length).equals(0);
        assume(calls).equals(1);
      });
  
      it('only emits once for multiple events', function () {
        var e = new EventEmitter()
          , multi = 0
          , foo = 0
          , bar = 0;
  
        e.once('foo', function () {
          foo++;
        });
  
        e.once('foo', function () {
          bar++;
        });
  
        e.on('foo', function () {
          multi++;
        });
  
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
        e.emit('foo');
  
        assume(e.listeners('foo').length).equals(1);
        assume(multi).equals(5);
        assume(foo).equals(1);
        assume(bar).equals(1);
      });
  
      it('only emits once with context', function (done) {
        var context = { foo: 'bar' }
          , e = new EventEmitter();
  
        e.once('foo', function (bar) {
          assume(this).equals(context);
          assume(bar).equals('bar');
  
          done();
        }.bind(context)).emit('foo', 'bar');
      });
    });
  
    describe('EventEmitter#removeListener', function () {
    // TODO
    //   it('removes all listeners when the listener is not specified', function () {
    //     var e = new EventEmitter();
  
    //     e.on('foo', function () {});
    //     e.on('foo', function () {});
  
    //     assume(e.removeListener('foo')).equals(e);
    //     assume(e.listeners('foo')).eql([]);
    //   });
  
      it('removes only the listeners matching the specified listener', function () {
        var e = new EventEmitter();
  
        function foo() {}
        function bar() {}
        function baz() {}
  
        e.on('foo', foo);
        e.on('bar', bar);
        e.on('bar', baz);
  
        assume(e.removeListener('foo', bar)).equals(e);
        assume(e.listeners('bar')).eql([bar, baz]);
        assume(e.listeners('foo')).eql([foo]);
        assume(e._eventsCount).equals(2);
  
        assume(e.removeListener('foo', foo)).equals(e);
        assume(e.listeners('bar')).eql([bar, baz]);
        assume(e.listeners('foo')).eql([]);
        assume(e._eventsCount).equals(1);
  
        assume(e.removeListener('bar', bar)).equals(e);
        assume(e.listeners('bar')).eql([baz]);
        assume(e._eventsCount).equals(1);
  
        assume(e.removeListener('bar', baz)).equals(e);
        assume(e.listeners('bar')).eql([]);
        assume(e._eventsCount).equals(0);

        e.on('foo', foo);
        e.on('foo', foo);
        e.on('bar', bar);
  
        assume(e.removeAllListeners('foo')).equals(e);

        assume(e.listeners('bar')).eql([bar]);
        assume(e.listeners('foo')).eql([]);
        assume(e._eventsCount).equals(1);
      });
  
      // it('removes only the listeners matching the correct context', function () {
      //   var context = { foo: 'bar' }
      //     , e = new EventEmitter();
  
      //   function foo() {}
      //   function bar() {}
  
      //   e.on('foo', foo, context);
  
      //   assume(e.removeListener('foo', function () {}, context)).equals(e);
      //   assume(e.listeners('foo')).eql([foo]);
      //   assume(e._eventsCount).equals(1);
  
      //   assume(e.removeListener('foo', foo, { baz: 'quux' })).equals(e);
      //   assume(e.listeners('foo')).eql([foo]);
      //   assume(e._eventsCount).equals(1);
  
      //   assume(e.removeListener('foo', foo, context)).equals(e);
      //   assume(e.listeners('foo')).eql([]);
      //   assume(e._eventsCount).equals(0);
  
      //   e.on('foo', foo, context);
      //   e.on('foo', bar);
  
      //   assume(e.removeListener('foo', foo, { baz: 'quux' })).equals(e);
      //   assume(e.listeners('foo')).eql([foo, bar]);
      //   assume(e._eventsCount).equals(1);
  
      //   assume(e.removeListener('foo', foo, context)).equals(e);
      //   assume(e.listeners('foo')).eql([bar]);
      //   assume(e._eventsCount).equals(1);
  
      //   e.on('foo', bar, context);
  
      //   assume(e.removeListener('foo', bar)).equals(e);
      //   assume(e.listeners('foo')).eql([]);
      //   assume(e._eventsCount).equals(0);
      // });
    });
  
    describe('EventEmitter#removeAllListeners', function () {
      it('removes all events for the specified events', function () {
        var e = new EventEmitter();
  
        e.on('foo', function () { throw new Error('oops'); });
        e.on('foo', function () { throw new Error('oops'); });
        e.on('bar', function () { throw new Error('oops'); });
        e.on('aaa', function () { throw new Error('oops'); });
  
        assume(e.removeAllListeners('foo')).equals(e);
        assume(e.listeners('foo').length).equals(0);
        assume(e.listeners('bar').length).equals(1);
        assume(e.listeners('aaa').length).equals(1);
        assume(e._eventsCount).equals(2);
  
        assume(e.removeAllListeners('bar')).equals(e);
        assume(e._eventsCount).equals(1);
        assume(e.removeAllListeners('aaa')).equals(e);
        assume(e._eventsCount).equals(0);
  
        assume(e.emit('foo')).equals(false);
        assume(e.emit('bar')).equals(false);
        assume(e.emit('aaa')).equals(false);
      });
  
      it('just nukes the fuck out of everything', function () {
        var e = new EventEmitter();
  
        e.on('foo', function () { throw new Error('oops'); });
        e.on('foo', function () { throw new Error('oops'); });
        e.on('bar', function () { throw new Error('oops'); });
        e.on('aaa', function () { throw new Error('oops'); });
  
        assume(e.removeAllListeners()).equals(e);
        assume(e.listeners('foo').length).equals(0);
        assume(e.listeners('bar').length).equals(0);
        assume(e.listeners('aaa').length).equals(0);
        assume(e._eventsCount).equals(0);
  
        assume(e.emit('foo')).equals(false);
        assume(e.emit('bar')).equals(false);
        assume(e.emit('aaa')).equals(false);
      });
    });
  
    describe('EventEmitter#eventNames', function () {
      it('returns an empty array when there are no events', function () {
        var e = new EventEmitter();
  
        assume(e.eventNames()).eql([]);
  
        e.on('foo', function () {});
        e.removeAllListeners('foo');
  
        assume(e.eventNames()).eql([]);
      });
  
      it('returns an array listing the events that have listeners', function () {
        var e = new EventEmitter()
          , original;
  
        function bar() {}
  
        if (Object.getOwnPropertySymbols) {
          //
          // Monkey patch `Object.getOwnPropertySymbols()` to increase coverage
          // on Node.js > 0.10.
          //
          original = Object.getOwnPropertySymbols;
          Object.getOwnPropertySymbols = undefined;
        }
  
        e.on('foo', function () {});
        e.on('bar', bar);
  
        try {
          assume(e.eventNames()).eql(['foo', 'bar']);
          e.removeListener('bar', bar);
          assume(e.eventNames()).eql(['foo']);
        } catch (ex) {
          throw ex;
        } finally {
          if (original) Object.getOwnPropertySymbols = original;
        }
      });
  
      it('does not return inherited property identifiers', function () {
        var e = new EventEmitter();
  
        function Collection() {}
        Collection.prototype.foo = function () {
          return 'foo';
        };
  
        (e as any)._events = new Collection();
  
        assume((e as any)._events.foo()).equal('foo');
        assume(e.eventNames()).eql([]);
      });
  
      if ('undefined' !== typeof Symbol) it('includes ES6 symbols', function () {
        var e = new EventEmitter()
          , s = Symbol('s');
  
        function foo() {}
  
        e.on('foo', foo);
        e.on(s, function () {});
  
        assume(e.eventNames()).eql(['foo', s]);
  
        e.removeListener('foo', foo);
  
        assume(e.eventNames()).eql([s]);
      });
    });
  });