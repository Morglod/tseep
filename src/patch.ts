import { EventEmitter } from './ee';

export function patchEE3() {
    try {
        const ee3 = require('eventemitter3');
        if (ee3) {
            ee3.EventEmitter = EventEmitter;
        }
    } catch(err) {
        console.error(err);
    }
}

export function patchEvents() {
    try {
        const ee = require('events');
        if (ee) {
            ee.EventEmitter = EventEmitter;
        }
    } catch(err) {
        console.error(err);
    }
}

export function patchAll() {
    patchEE3();
    patchEvents();
}