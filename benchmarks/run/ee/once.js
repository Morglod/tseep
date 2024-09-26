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
  , TSEEPSafe = require('../../../lib/ee-safe')
  , Emitix = require('emitix').default
  , mitt = require('mitt')
  // , Emittery = require('emittery').default
;

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
  , tseepSafe = new TSEEPSafe.EventEmitter()
  , ee = EE()
  , emitix = new Emitix()
  , mitt_ = mitt()
  // , emittery = new Emittery()
;

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.once('foo', handle).emit('foo');
}).add('EventEmitter2', function() {
  ee2.once('foo', handle).emit('foo');
}).add('EventEmitter3', function() {
  ee3.once('foo', handle).emit('foo');
}).add('Drip', function() {
  drip.once('foo', handle).emit('foo');
}).add('fastemitter', function() {
  fe.once('foo', handle).emit('foo');
}).add('event-emitter', function() {
  ee.once('foo', handle).emit('foo');
}).add('contra/emitter', function() {
  ce.once('foo', handle).emit('foo');
})
// TOO SLOW
// .add('tsee', function() {
//   tsee.once('foo', handle).emit('foo');
// })
.add('tseep', function() {
  tseep.once('foo', handle).emit('foo');
})
.add('tseep safe', function() {
  tseepSafe.once('foo', handle).emit('foo');
})
.add('emitix', function() {
  emitix.once('foo', handle);
  emitix.emit('foo');
})
// .add('mitt', function() {
//   mitt_.once('foo', handle);
//   mitt_.emit('foo');
// })
// .add('emittery', function() {
//   emittery.once('foo', handle);
//   emittery.emit('foo');
// })
.on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
