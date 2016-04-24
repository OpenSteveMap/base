/// <reference path="../../typings/main.d.ts" />

import { LatLng } from './index';
import { IAbstractApiDescription, simpleApiTestFactory } from '../abstraction/test-factory';

export var latlngApi: IAbstractApiDescription = {
    lat: {
        methodTypes: ['get', 'set'],
        testData: [12, 56]
    },
    lng: {
        methodTypes: ['get', 'set'],
        testData: [34, 78]
    }
};

simpleApiTestFactory('LatLng', LatLng, latlngApi);
