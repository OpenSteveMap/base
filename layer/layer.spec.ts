/// <reference path="../typings/main.d.ts" />

import { Layer, hasLayerType, registerLayerType, getLayerType, createLayer } from './index';
import { IAbstractApiDescription, simpleApiTestFactory } from '../abstraction/test-factory';

export var layerApi: IAbstractApiDescription = {
    attribution: {
        methodTypes: ['get', 'set'],
        testData: ['this is a test layer', 'still a test layer']
    },
    display: {
        methodTypes: ['enable', 'disable'],
        testData: [false, true]
    },
    maxZoom: {
        methodTypes: ['get', 'set'],
        testData: [17, 15]
    },
    minZoom: {
        methodTypes: ['get', 'set'],
        testData: [3, 5]
    },
    name: {
        methodTypes: ['get', 'set'],
        testData: ['My testlayer', 'Your testlayer']
    },
    opacity: {
        methodTypes: ['get', 'set'],
        testData: [1, 0.5]
    },
    type: {
        methodTypes: ['get'],
        testData: ['test']
    }
};

simpleApiTestFactory('Layer', Layer, layerApi);

// Layer registry

describe('Layer registry', (): void => {

    class TestLayer extends Layer {
        public type: 'abstraction';
    }
    it('should not have a registered layer-type with name abstraction', (): void => {
        if (hasLayerType('abstraction')) {
            throw new Error('Found a layer-type with name abstraction');
        }
    });
    it('should be able to register a layer-type with name abstraction', (): void => {
        registerLayerType('abstraction', TestLayer);
    });
    it('should be able to get the above created layer-type with name abstraction', (): void => {
        if (getLayerType('abstraction') !== TestLayer) {
            throw new Error('Wrong abstraction registered');
        }
    });
    it('should be possible to create a layer from registry factory with layer-type abstraction', (): void => {
        var testMap: any = {},
            layer: any = createLayer({
                attribution: 'Just a test layer',
                name: 'Test Layer',
                type: 'abstraction'
            });

        if (!TestLayer.prototype.isPrototypeOf(layer)) {
            throw new Error('Not instantiated from the correct abstraction');
        }
        layer.addToMap(testMap);
        if (layer.map !== testMap) {
            throw new Error('Incorrect Map added');
        }
    });
});
