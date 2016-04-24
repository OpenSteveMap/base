/// <reference path="../../typings/main.d.ts" />


import { Map } from './index';
import { IAbstractApiDescription, simpleApiTestFactory, ITestData } from '../abstraction/test-factory';
import { Layer, registerLayerType } from '../layer';


function deepLatLngCompare(data: ITestData, done: MochaDone): void {
    'use strict';
    if (data.expectedValue.lat !== data.value.lat || data.expectedValue.lng !== data.value.lng) {
        return done(new Error('Lat-Lng is not equal'));
    }
    return done();
}

export var mapApi: IAbstractApiDescription = {
    center: {
        callbacks: {
            get: deepLatLngCompare,
            initial: deepLatLngCompare,
            set: deepLatLngCompare,
            setEvent: deepLatLngCompare,
            setEventS: deepLatLngCompare,
            setWatchEvent: deepLatLngCompare,
            setWatchEventS: deepLatLngCompare
        },
        methodTypes: ['get', 'set'],
        testData: [{lat: 12, lng: 34}, {lat: 87, lng: 65}]
    },
    layers: {
        callbacks: {
            get: (data: ITestData, done: MochaDone): void => {
                if (data.expectedValue.length !== data.value.length) {
                    return done(new Error('Invalid layer size'));
                }
                return done();
            },
            initial: (data: ITestData, done: MochaDone): void => {
                return done();
            },
            set: (data: ITestData, done: MochaDone): void => {
                if (data.expectedValue.length !== data.value.length) {
                    return done(new Error('Invalid layer size'));
                }
                return done();
            },
            setEvent: (data: ITestData, done: MochaDone): void => {
                if (data.expectedValue.length !== data.value.length) {
                    return done(new Error('Invalid layer size'));
                }
                return done();
            },
            setEventS: (data: ITestData, done: MochaDone): void => {
                if (data.expectedValue.length !== data.value.length) {
                    return done(new Error('Invalid layer size'));
                }
                return done();
            },
            setWatchEvent: (data: ITestData, done: MochaDone): void => {
                return done(); // Not testable here because watch is fired multiple
            },
            setWatchEventS: (data: ITestData, done: MochaDone): void => {
                return done(); // Not testable here because watch is fired multiple
            }
        },
        methodTypes: ['get', 'set', 'add', 'remove'],
        testData: [
            [{attribution: 'Just a test', name: 'test', type: 'layer-test'}],
            [{attribution: 'Another test', name: 'test2', type: 'layer-test'}]
        ]
    },
    zoom: {
        methodTypes: ['get', 'set'],
        testData: [12, 17]
    }
};

class TestLayer extends Layer {
    public type: string = 'layer-test';
}
registerLayerType('layer-test', TestLayer);

simpleApiTestFactory('Map', Map, mapApi);
