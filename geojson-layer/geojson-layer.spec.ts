/// <reference path="../typings/main.d.ts" />

import IFeatureCollection = GeoJSON.FeatureCollection;
import IFeature = GeoJSON.Feature;

import { GeojsonLayer } from './index';
import { layerApi } from '../layer/layer.spec';
import { IAbstractApiDescription, simpleApiTestFactory, cloneApiDescription, ITestData } from '../abstraction/test-factory';


export var geojsonLayerApi: IAbstractApiDescription = cloneApiDescription(layerApi);

/* tslint:disable:no-string-literal */
geojsonLayerApi['type'] = {
    methodTypes: ['get'],
    testData: ['geojson', 'geojson']
};
geojsonLayerApi['data'] = {
    callbacks: {
        initial: (data: ITestData, done: MochaDone): void => {
            if (data.value.type !== 'FeatureCollection' || data.value.features.length !== data.expectedValue.features.length) {
                return done(new Error('Incorrect geojson data'));
            }
            return done();
        }
    },
    methodTypes: ['get', 'set'], // todo: add
    testData: [
        {
            features: [
                {
                    geometry: {coordinates: [102.0, 0.5], type: 'Point'},
                    properties: {test: 'a'},
                    type: 'Feature'
                }
            ],
            type: 'FeatureCollection'
        },
        {
            features: [
                {
                    geometry: {coordinates: [101.0, 111.0], type: 'Point'},
                    properties: {test: 'b'},
                    type: 'Feature'
                },
                {
                    geometry: {coordinates: [12.0, 5], type: 'Point'},
                    properties: {test: 'c'},
                    type: 'Feature'
                }
            ],
            type: 'FeatureCollection'
        }
    ]
};
/* tslint:enable:no-string-literal */

describe('GeoJSON Layer', (): void => {
    simpleApiTestFactory('GeoJSON Layer', GeojsonLayer, geojsonLayerApi);

    it('should add data', (): void => {
        var geojsonLayer: GeojsonLayer<any> = new GeojsonLayer({
                name: 'test',
                type: 'geojson'
            }),
            testObject: any = {},

            testFeature: IFeatureCollection<any>  = {
                features: [testObject],
                type: 'FeatureCollection'
            };

        geojsonLayer.addData(testFeature);

        if (geojsonLayer.data.features.length !== 1 || geojsonLayer.data.features[0] !== testObject) {
            throw new Error('Data not added...');
        }
    });
    it('should remove data', (): void => {
        var testFeature: IFeature<any> = {
                geometry: {
                    coordinates: [7, 51],
                    type: 'Point'
                },
                properties: {
                    name: 'Center...'
                },
                type: 'Feature'
            },
            testFeatureCollection: IFeatureCollection<any> = {
                features: [testFeature],
                type: 'FeatureCollection'
            },
            geojsonLayer: GeojsonLayer<any> = new GeojsonLayer({
                data: testFeatureCollection,
                name: 'test',
                type: 'geojson'
            });

        if (geojsonLayer.data.features.length !== 1 || geojsonLayer.data.features[0] !== testFeature) {
            throw new Error('Data not initially added...');
        }
        geojsonLayer.removeData({
            features: [testFeature],
            type: 'FeatureCollection'
        });

        if (geojsonLayer.data.features.length !== 0) {
            throw new Error('Data not removed...');
        }
    });
});
