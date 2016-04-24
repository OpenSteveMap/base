
import {Abstraction, getterHelper, setterHelper } from '../abstraction';
import { IMap } from '../map/declaration';

export interface ILayerOptions {
    type: string;
    name: string;

    attribution?: string;
    opacity?: number;
    minZoom?: number;
    maxZoom?: number;
    // maxNativeZoom?: number; // todo maybe insert in tile-layer
}

export interface ILayer extends ILayerOptions {
    // opacity: number;
    // minZoom: number;
    // maxZoom: number;
    // maxNativeZoom: number;

    setName(value: string, origin?: any[]): ILayer;
    setAttribution(value: string, origin?: any[]): ILayer;
    setOpacity(value: number, origin?: any[]): ILayer;
    setMaxZoom(value: number, origin?: any[]): ILayer;
    setMinZoom(value: number, origin?: any[]): ILayer;
    // setMaxNativeZoom(value: string, origin?: any[]): void;

    getName(): string;
    getAttribution(): string;
    getOpacity(): number;
    getMaxZoom(): number;
    getMinZoom(): number;
    getMaxNativeZoom(): number;

    getType(): string;

}

export class Layer extends Abstraction implements ILayer {
    public type: string;
    public name: string;
    public attribution: string;
    public opacity: number;
    public maxZoom: number;
    public minZoom: number;
    // public maxNativeZoom: number

    public map: IMap;

    constructor(opts: ILayerOptions) {
        super();
        if (!opts.hasOwnProperty('opacity') || opts.opacity === undefined) {
            opts.opacity = 1;
        }

        this.type = opts.type;

        this.name = opts.name;
        this.attribution = opts.attribution;

        this.opacity = opts.opacity;
        this.minZoom = opts.minZoom;
        this.maxZoom = opts.maxZoom;
    }

    public setName(value: string, origin: any[] = []): Layer {
        setterHelper(this, 'name', value, origin);
        return this;
    }
    public setAttribution(value: string, origin: any[] = []): Layer {
        setterHelper(this, 'attribution', value, origin);
        return this;
    }
    public setOpacity(value: number, origin: any[] = []): Layer {
        setterHelper(this, 'opacity', value, origin);
        return this;
    }
    public setMaxZoom(value: number, origin: any[] = []): Layer {
        setterHelper(this, 'maxZoom', value, origin);
        return this;
    }
    public setMinZoom(value: number, origin: any[] = []): Layer {
        setterHelper(this, 'minZoom', value, origin);
        return this;
    }
    public setMaxNativeZoom(value: number, origin: any[] = []): Layer {
        setterHelper(this, 'maxNativeZoom', value, origin);
        return this;
    }

    public getName(): string {
        return getterHelper(this, 'name');
    }
    public getAttribution(): string {
        return getterHelper(this, 'attribution');
    }
    public getOpacity(): number {
        return getterHelper(this, 'opacity');
    }
    public getMaxZoom(): number {
        return getterHelper(this, 'maxZoom');
    }
    public getMinZoom(): number {
        return getterHelper(this, 'minZoom');
    }
    public getType(): string {
        return getterHelper(this, 'type');
    }
    public getMaxNativeZoom(): number {
        return getterHelper(this, 'maxNativeZoom');
    }
}

// Layer registry

export interface ILayerStatic {
    new (opts: ILayerOptions): Layer;
}

export interface ILayerDictionary {
    [name: string]: ILayerStatic;
}

var layerDict: ILayerDictionary = {};

export function createLayer(opts: ILayerOptions, map: IMap): Layer {
    'use strict';
    var tmp: any; // type helper

    if (!layerDict[opts.type]) {
        console.log(opts, layerDict);
        throw new Error('There is no registered layer for type "' + opts.type + '"');
    }
    if (layerDict[opts.type].prototype.isPrototypeOf(opts)) {
        tmp = opts;
    } else {
        tmp = new layerDict[opts.type](opts);
    }
    tmp.map = map;
    return tmp;
}
export function registerLayerType(type: string, driver: ILayerStatic): void {
    'use strict';
    layerDict[type] = driver;
}
export function hasLayerType(type: string): boolean {
    'use strict';
    return !!layerDict[type];
}
export function getLayerType(type: string): ILayerStatic {
    'use strict';
    return layerDict[type];
}
