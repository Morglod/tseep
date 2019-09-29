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
  , TSEEP = require('../../lib')

function handle() {
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
  , ee = EE();

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.on('foo', handle);
  ee1.removeListener('foo', handle);
}).add('EventEmitter2', function() {
  ee2.on('foo', handle);
  ee2.removeListener('foo', handle);
}).add('EventEmitter3', function() {
  ee3.on('foo', handle);
  ee3.removeListener('foo', handle);
}).add('Drip', function() {
  drip.on('foo', handle);
  drip.removeListener('foo', handle);
}).add('fastemitter', function() {
  fe.on('foo', handle);
  fe.removeListener('foo', handle);
}).add('event-emitter', function() {
  ee.on('foo', handle);
  ee.off('foo', handle);
}).add('contra/emitter', function() {
  ce.on('foo', handle);
  ce.off('foo', handle);
}).add('tsee', function() {
  tsee.on('foo', handle);
  tsee.off('foo', handle);
}).add('tseep', function() {
  tseep.on('foo', handle);
  tseep.off('foo', handle);
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
