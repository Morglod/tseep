'use strict';

var benchmark = require('benchmark');

var EventEmitter1 = require('events').EventEmitter
  , EventEmitter3 = require('eventemitter3')
  , FE = require('fastemitter')
  , TSEE = require('tsee')
  , TSEEP = require('../../lib')
  , Emitix = require('emitix').default
  , mitt = require('mitt')
;

var MAX_LISTENERS = Math.pow(2, 32) - 1;

function handle() {
  if (arguments.length > 100) console.log('damn');
}

var ee1 = new EventEmitter1()
  , ee3 = new EventEmitter3()
  , tsee = new TSEE.EventEmitter()
  , tseep = new TSEEP.EventEmitter()
  , fe = new FE()
  , emitix = new Emitix()
, mitt_ = mitt()
;

ee1.setMaxListeners(MAX_LISTENERS);
fe.setMaxListeners(MAX_LISTENERS);
tsee.setMaxListeners(MAX_LISTENERS);
tseep.setMaxListeners(MAX_LISTENERS);
// emitix.setMaxListeners(MAX_LISTENERS);

for (var i = 0; i < 25; i++) {
  ee1.on('event', handle);
  ee3.on('event', handle);
  fe.on('event', handle);
  tsee.on('event', handle);
  tseep.on('event', handle);
  // emitix.on('event', handle);
}

//
// eventemitter2 doesn't correctly handle listeners as they can be removed by
// doing `ee2.listeners('event').length = 0;`. Same counts for Drip.
//
// same for emitix
//
// event-emitter and contra/emitter do not implement `listeners`.
//

(
  new benchmark.Suite()
).add('EventEmitter1', function () {
  ee1.listeners('event');
}).add('EventEmitter3', function() {
  ee3.listeners('event');
}).add('fastemitter', function() {
  fe.listeners('event');
}).add('tsee', function() {
  tsee.listeners('event');
}).add('tseep', function() {
  tseep.listeners('event');
})
// .add('emitix', function() {
//   emitix.listeners('event');
// })
.on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
