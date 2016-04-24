/// <reference path="../typings/main.d.ts" />

import { Driver } from './index';

const TARGET: Object = {};

class TestDriver extends Driver {
    public target: Object;

    constructor() {
        super();
        this.target = TARGET;
    }

    public testPropagate(): void {
        this.propagateChange();
    }
    public isPropergating(): boolean {
        return this.changePropagated;
    }
}

describe('Driver', (): void => {
    it('should implement a target', (): void => {
        if ((new TestDriver()).target !== TARGET) {
            throw new Error('Got a wrong target');
        }
    });
    it('should propagate a change', (done: MochaDone): void => {
        var testTarget: TestDriver = new TestDriver();
        testTarget.testPropagate();
        if (!testTarget.isPropergating()) {
            return done(Error('Is not propagating'));
        }
        /* tslint:disable:align */
        setTimeout((): void => {
            if (testTarget.isPropergating()) {
                return done(Error('Is still propagating'));
            }
            return done();
        }, 0);
        /* tslint:enable:align */
    });
});
