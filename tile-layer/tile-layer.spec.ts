/// <reference path="../typings/main.d.ts" />

import { TileLayer } from './index';
import { layerApi } from '../layer/layer.spec';
import { IAbstractApiDescription, simpleApiTestFactory, cloneApiDescription } from '../abstraction/test-factory';

export var tileLayerApi: IAbstractApiDescription = cloneApiDescription(layerApi);

/* tslint:disable:no-string-literal */
tileLayerApi['type'] = {
    methodTypes: ['get'],
    testData: ['tile', 'tile']
};
tileLayerApi['url'] = {
    methodTypes: ['get', 'set'],
    testData: ['http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png']
};
/* tslint:enable:no-string-literal */

simpleApiTestFactory('TileLayer', TileLayer, tileLayerApi);
