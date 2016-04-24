/// <reference path="../../typings/main.d.ts" />

import { getterHelper, setterHelper, emitterHelper } from '../abstraction';
import { Layer, ILayerOptions, registerLayerType, ILayer } from '../layer';
import IFeatureCollection = GeoJSON.FeatureCollection;
import GeometryObject = GeoJSON.GeometryObject;
export import IPathOptions = L.PathOptions;

export interface IGeojsonLayerOptions<T extends GeometryObject> extends ILayerOptions {
    data?: IFeatureCollection<T>;
    style?: IPathOptions;
    styler?: IStyler;
}

export interface IStyler {
    (feature: any, defaultStyle: IPathOptions): IPathOptions;
}

export interface IGeojsonLayer<T extends GeometryObject> extends ILayer, IGeojsonLayerOptions<T> {
    setData(data: IFeatureCollection<T>, origin?: any[]): IGeojsonLayer<T>;
    addData(data: IFeatureCollection<T>, origin?: any[]): IGeojsonLayer<T>;
    removeData(data: IFeatureCollection<T>, origin?: any[]): IGeojsonLayer<T>;
    getData(): IFeatureCollection<T>;

    setStyle(obj: IPathOptions): IGeojsonLayer<T>;
    getStyle(): IPathOptions;

    setStyler(fn: IStyler): IGeojsonLayer<T>;
    getStyler(): IStyler;
}

export class GeojsonLayer<T extends GeometryObject> extends Layer implements IGeojsonLayer<T> {
    public data: IFeatureCollection<T>;
    public style: IPathOptions;
    public styler: IStyler;

    constructor(opts: IGeojsonLayerOptions<T>) {
        opts.type = opts.type || 'geojson';
        super(opts);
        this.style = opts.style || {};
        this.data = opts.data || {
                features: [],
                type: 'FeatureCollection'
            };
        this.styler = opts.styler || ((feature: any, defaultStyle: IPathOptions): IPathOptions => {
                return defaultStyle;
            });
    }

    public setData(data: IFeatureCollection<T>, origin: any[] = []): GeojsonLayer<T> {
        setterHelper(this, 'data', data, origin);
        return this;
    }
    public addData(data: IFeatureCollection<T>, origin: any[] = []): GeojsonLayer<T> {
        emitterHelper(this, 'add', 'data', data, [this]);
        this.data.features.push.apply(this.data.features, data.features);
        return this;
    }
    public removeData(data: IFeatureCollection<T>, origin: any[] = []): GeojsonLayer<T> {
        emitterHelper(this, 'remove', 'data', data, [this]);
        for (let i: number = 0; i < data.features.length; i += 1) {
            let position: number = this.data.features.indexOf(data.features[i]);
            if (position !== -1) {
                this.data.features.splice(position, 1);
            }
        }
        return this;
    }
    public getData(): IFeatureCollection<T> {
        return getterHelper(this, 'data');
    }

    public setStyle(data: IPathOptions, origin: any[] = []): GeojsonLayer<T> {
        setterHelper(this, 'style', data, origin);
        return this;
    }
    public getStyle(): IPathOptions {
        return getterHelper(this, 'style');
    }

    public setStyler(data: IStyler, origin: any[] = []): GeojsonLayer<T> {
        setterHelper(this, 'styler', data, origin);
        return this;
    }
    public getStyler(): IStyler {
        return getterHelper(this, 'styler');
    }
}

registerLayerType('geojson', GeojsonLayer);
