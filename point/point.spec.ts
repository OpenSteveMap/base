/// <reference path="../typings/main.d.ts" />

import { simpleApiTestFactory, IAbstractApiDescription } from '../abstraction/test-factory';
import { Point } from './index';

export var pointApi: IAbstractApiDescription = {
    x: {
        methodTypes: ['get', 'set'],
        testData: [12, 56]
    },
    y: {
        methodTypes: ['get', 'set'],
        testData: [34, 78]
    }
};

describe('Point', (): void => {
    simpleApiTestFactory('Point', Point, pointApi);

    describe('Enhanced API', (): void => {
        var testPoint: Point;

        const TEST_X: number = 12,
            TEST_Y: number = 34;

        beforeEach((): void => {
            testPoint = new Point({
                x: TEST_X,
                y: TEST_Y
            });
        });

        it('should clone a point', (): void => {
            var clonedPoint: Point = testPoint.clone();
            if (clonedPoint === testPoint) {
                throw new Error('Point was not cloned, it is the same');
            }
            if (clonedPoint.x !== testPoint.x || clonedPoint.y !== testPoint.y) {
                throw new Error('Coordinates are not the same');
            }
        });
        it('should add a point', (): void => {
            var randomXValue: number = Math.floor(Math.random() * 10),
                randomYValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('add', (): void => {
                specificChange = true;
            });

            testPoint.add({
                x: randomXValue,
                y: randomYValue
            });
            if (testPoint.x !== TEST_X + randomXValue || testPoint.y !== TEST_Y + randomYValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should subtract a point', (): void => {
            var randomXValue: number = Math.floor(Math.random() * 10),
                randomYValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('subtract', (): void => {
                specificChange = true;
            });

            testPoint.subtract({
                x: randomXValue,
                y: randomYValue
            });
            if (testPoint.x !== TEST_X - randomXValue || testPoint.y !== TEST_Y - randomYValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should scale a point', (): void => {
            var randomXValue: number = Math.floor(Math.random() * 10),
                randomYValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('scaleBy', (): void => {
                specificChange = true;
            });

            testPoint.scaleBy({
                x: randomXValue,
                y: randomYValue
            });
            if (testPoint.x !== TEST_X * randomXValue || testPoint.y !== TEST_Y * randomYValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should unscale a point', (): void => {
            var randomXValue: number = Math.floor(Math.random() * 10),
                randomYValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('unscaleBy', (): void => {
                specificChange = true;
            });

            testPoint.unscaleBy({
                x: randomXValue,
                y: randomYValue
            });
            if (testPoint.x !== TEST_X / randomXValue || testPoint.y !== TEST_Y / randomYValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should divide a point by a number', (): void => {
            var randomValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('divideBy', (): void => {
                specificChange = true;
            });

            testPoint.divideBy(randomValue);
            if (testPoint.x !== TEST_X / randomValue || testPoint.y !== TEST_Y / randomValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should multiply a point by a number', (): void => {
            var randomValue: number = Math.floor(Math.random() * 10),
                changed: boolean,
                specificChange: boolean;

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('multiplyBy', (): void => {
                specificChange = true;
            });

            testPoint.multiplyBy(randomValue);
            if (testPoint.x !== TEST_X * randomValue || testPoint.y !== TEST_Y * randomValue) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should round a point', (): void => {
            var changed: boolean,
                specificChange: boolean;
            testPoint.add({
                x: 0.5,
                y: 0.5
            });
            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('round', (): void => {
                specificChange = true;
            });
            testPoint.round();
            if (testPoint.x !== TEST_X + 1 || testPoint.y !== TEST_Y + 1) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should get floor of a point', (): void => {
            var changed: boolean,
                specificChange: boolean;
            testPoint.add({
                x: 0.5,
                y: 0.5
            });

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('floor', (): void => {
                specificChange = true;
            });

            testPoint.floor();
            if (testPoint.x !== TEST_X || testPoint.y !== TEST_Y) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should get ceiling of a point', (): void => {
            var changed: boolean,
                specificChange: boolean;
            testPoint.add({
                x: 0.5,
                y: 0.5
            });

            testPoint.once('change', (): void => {
                changed = true;
            });
            testPoint.once('ceil', (): void => {
                specificChange = true;
            });

            testPoint.ceil();
            if (testPoint.x !== TEST_X + 1 || testPoint.y !== TEST_Y + 1) {
                throw new Error('Coordinates are not calculated correctly');
            }
            if (!changed || !specificChange) {
                throw new Error('Event not fired');
            }
        });
        it('should get equals two different points with same coordinates', (): void => {
            var anotherPoint: Point = new Point({
                x: TEST_X,
                y: TEST_Y
            });
            if (!testPoint.equals(anotherPoint)) {
                throw new Error('Not identified equal point');
            }
        });
        it('should get equals two different points with same coordinates', (): void => {
            var anotherPoint: Point = new Point({
                x: TEST_X + 1,
                y: TEST_Y + 1
            });
            if (testPoint.equals(anotherPoint)) {
                throw new Error('Identified unequal point as equal');
            }
        });
        it('should identify containing point', (): void => {
            var anotherPoint: Point = new Point({
                x: Math.abs(TEST_X) - 1,
                y: Math.abs(TEST_Y) - 1
            });
            if (!testPoint.contains(anotherPoint)) {
                throw new Error('Not identified containing point');
            }
        });
        it('should identify not-containing point', (): void => {
            var anotherPoint: Point = new Point({
                x: Math.abs(TEST_X) + 1,
                y: Math.abs(TEST_Y) + 1
            });
            if (testPoint.contains(anotherPoint)) {
                throw new Error('Not identified not-containing point');
            }
        });
    });
});
