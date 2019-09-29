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
  , TSEEP = require('../../lib');

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
  for (let i = 0; i < 10; ++i) ee1.once('foo', handle);
  ee1.emit('foo');
}).add('EventEmitter2', function() {
  for (let i = 0; i < 10; ++i) ee2.once('foo', handle);
  ee2.emit('foo');
}).add('EventEmitter3', function() {
  for (let i = 0; i < 10; ++i) ee3.once('foo', handle);
  ee3.emit('foo');
}).add('Drip', function() {
  for (let i = 0; i < 10; ++i) drip.once('foo', handle);
  drip.emit('foo');
}).add('fastemitter', function() {
  for (let i = 0; i < 10; ++i) fe.once('foo', handle);
  fe.emit('foo');
}).add('event-emitter', function() {
  for (let i = 0; i < 10; ++i) ee.once('foo', handle);
  ee.emit('foo');
}).add('contra/emitter', function() {
  for (let i = 0; i < 10; ++i) ce.once('foo', handle);
  ce.emit('foo');
})
// TOO SLOW
// .add('tsee', function() {
//   tsee.emit('foo');
// })
.add('tseep', function() {
  for (let i = 0; i < 10; ++i) tseep.once('foo', handle);
  tseep.emit('foo');
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({
  async: true
});
