'use strict';

var benchmark = require('benchmark');

var EventEmitter2 = require('eventemitter2').EventEmitter2
  , EventEmitter1 = require('events').EventEmitter
  , EventEmitter3 = require('eventemitter3')
  , CE = require('contra/emitter')
  , EE = require('event-emitter')
  , FE = require('fastemitter')
  , TSEE = require('tsee')
  , TSEEP = require('../../lib');

function foo(a,b,c,d) {
  if (arguments.length > 100) console.log('damn');

  return 1;
}

function bar(a,b,c,d) {
  if (arguments.length > 100) console.log('damn');

  return false;
}

function baz(a,b,c,d) {
  if (arguments.length > 100) console.log('damn');

  return true;
}

var ee1 = new EventEmitter1()
  , ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , fe = new FE()
  , ce = CE()
  , tsee = new TSEE.EventEmitter()
  , tseep = new TSEEP.EventEmitter()
  , ee = EE();

ce.on('foo', foo).on('foo', bar).on('foo', baz);
ee.on('foo', foo).on('foo', bar).on('foo', baz);
fe.on('foo', foo).on('foo', bar).on('foo', baz);
ee3.on('foo', foo).on('foo', bar).on('foo', baz);
ee2.on('foo', foo).on('foo', bar).on('foo', baz);
ee1.on('foo', foo).on('foo', bar).on('foo', baz);

tsee.on('foo', foo).on('foo', bar).on('foo', baz);
tseep.on('foo', foo).on('foo', bar).on('foo', baz);

//
// Drip is omitted as it throws an error.
// Ref: https://github.com/qualiancy/drip/pull/4
//

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.emit('foo');
  ee1.emit('foo', 'bar');
  ee1.emit('foo', 'bar', 'baz');
  ee1.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter2', function() {
  ee2.emit('foo');
  ee2.emit('foo', 'bar');
  ee2.emit('foo', 'bar', 'baz');
  ee2.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3', function() {
  ee3.emit('foo');
  ee3.emit('foo', 'bar');
  ee3.emit('foo', 'bar', 'baz');
  ee3.emit('foo', 'bar', 'baz', 'boom');
}).add('fastemitter', function() {
  fe.emit('foo');
  fe.emit('foo', 'bar');
  fe.emit('foo', 'bar', 'baz');
  fe.emit('foo', 'bar', 'baz', 'boom');
}).add('event-emitter', function() {
  ee.emit('foo');
  ee.emit('foo', 'bar');
  ee.emit('foo', 'bar', 'baz');
  ee.emit('foo', 'bar', 'baz', 'boom');
}).add('contra/emitter', function() {
  ce.emit('foo');
  ce.emit('foo', 'bar');
  ce.emit('foo', 'bar', 'baz');
  ce.emit('foo', 'bar', 'baz', 'boom');
}).add('tsee', function() {
  tsee.emit('foo');
  tsee.emit('foo', 'bar');
  tsee.emit('foo', 'bar', 'baz');
  tsee.emit('foo', 'bar', 'baz', 'boom');
}).add('tseep', function() {
  tseep.emit('foo');
  tseep.emit('foo', 'bar');
  tseep.emit('foo', 'bar', 'baz');
  tseep.emit('foo', 'bar', 'baz', 'boom');
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
