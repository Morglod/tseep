'use strict';

var benchmark = require('benchmark');

var EventEmitter2 = require('eventemitter2').EventEmitter2
  , EventEmitter1 = require('events').EventEmitter
  , EventEmitter3 = require('eventemitter3')
  , Drip = require('drip').EventEmitter
  , CE = require('contra/emitter')
  , EE = require('event-emitter')
  , FE = require('fastemitter')
  , TSEE = require('tsee')
  , TSEEP = require('../../../lib')
  , Emitix = require('emitix').default
  , mitt = require('mitt')
;

function handle(a,b,c,d,e,f,g,h,i) {
  if (arguments.length > 100) console.log('damn');
}

var ee1 = new EventEmitter1()
  , ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , drip = new Drip()
  , fe = new FE()
  , ce = CE()
  , tsee = new TSEE.EventEmitter()
  , tseep = new TSEEP.EventEmitter()
  , ee = EE()
  , emitix = new Emitix()
, mitt_ = mitt()
;

ee.on('foo', handle);
fe.on('foo', handle);
ee3.on('foo', handle);
ee2.on('foo', handle);
ee1.on('foo', handle);
drip.on('foo', handle);
ce.on('foo', handle);
tsee.on('foo', handle);
tseep.on('foo', handle);
emitix.on('foo', handle);
mitt_.on('foo', handle);

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.emit('foo', 'bar', 'baz', 'boom');
  ee1.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  ee1.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('EventEmitter2', function() {
  ee2.emit('foo', 'bar', 'baz', 'boom');
  ee2.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  ee2.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('EventEmitter3', function() {
  ee3.emit('foo', 'bar', 'baz', 'boom');
  ee3.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  ee3.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('Drip', function() {
  drip.emit('foo', 'bar', 'baz', 'boom');
  drip.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  drip.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('fastemitter', function() {
  fe.emit('foo', 'bar', 'baz', 'boom');
  fe.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  fe.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('event-emitter', function() {
  ee.emit('foo', 'bar', 'baz', 'boom');
  ee.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  ee.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('contra/emitter', function() {
  ce.emit('foo', 'bar', 'baz', 'boom');
  ce.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  ce.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('tsee', function() {
  tsee.emit('foo', 'bar', 'baz', 'boom');
  tsee.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  tsee.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('tseep', function() {
  tseep.emit('foo', 'bar', 'baz', 'boom');
  tseep.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  tseep.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('emitix', function() {
  emitix.emit('foo', 'bar', 'baz', 'boom');
  emitix.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  emitix.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).add('mitt', function() {
  mitt_.emit('foo', 'bar', 'baz', 'boom');
  mitt_.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom');
  mitt_.emit('foo', 'bar', 'baz', 'boom', 'foo', 'bar', 'baz', 'boom', 123123);
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
