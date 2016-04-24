
import { Abstraction } from '../abstraction';
import { IProjection, mercator, Mercator, sphericalMercator, SphericalMercator } from '../projection';
import { ITransformationOptions, Transformation} from '../transformation';

export interface ICrsOptions {
    projection: IProjection;
    transformation: ITransformationOptions;

    code?: string;
}
export interface ICrs extends ICrsOptions {}

export class Crs extends Abstraction implements ICrs {
    public code: string;
    public projection: IProjection;
    public transformation: Transformation;

    constructor(opts: ICrsOptions) {
        super();
        this.code = opts.code;
        if (Transformation.prototype.isPrototypeOf(opts.transformation)) {
            let typeChange: any = opts.transformation;
            this.transformation = typeChange;
        } else {
            this.transformation = new Transformation(opts.transformation);
        }
        this.projection = opts.projection;
    }

}


// CRS registry

export interface ICrsDictionary {
    [name: string]: Crs;
}

var crsDict: ICrsDictionary = {};

export function registerCrs(type: string, crs: Crs): void {
    'use strict';
    crsDict[type] = crs;
}
export function hasCrs(name: string): boolean {
    'use strict';
    return crsDict.hasOwnProperty(name);
}
export function getCrs(name: string): Crs {
    'use strict';
    return crsDict[name];
}

// register basic references

registerCrs('EPSG:3395', new Crs({
    code: 'EPSG:3395',
    projection: mercator,
    transformation: {
        a: 0.5 / (Math.PI * Mercator.R),
        b: 0.5,
        c: -(0.5 / (Math.PI * Mercator.R)),
        d: 0.5,
    }
}));

registerCrs('EPSG:3857', new Crs({
    code: 'EPSG:3857',
    projection: sphericalMercator,
    transformation: {
        a: 0.5 / (Math.PI * SphericalMercator.R),
        b: 0.5,
        c: -(0.5 / (Math.PI * SphericalMercator.R)),
        d: 0.5
    }
}));

registerCrs('EPSG:900913', new Crs({
    code: 'EPSG:900913',
    projection: sphericalMercator,
    transformation: {
        a: 0.5 / (Math.PI * SphericalMercator.R),
        b: 0.5,
        c: -(0.5 / (Math.PI * SphericalMercator.R)),
        d: 0.5
    }
}));

registerCrs('EPSG:4326', new Crs({
    code: 'EPSG:4326',
    projection: sphericalMercator,
    transformation: {
        a: 0.5 / (Math.PI * SphericalMercator.R),
        b: 0.5,
        c: -(0.5 / (Math.PI * SphericalMercator.R)),
        d: 0.5
    }
}));
