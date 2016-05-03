
import { Abstraction, getterHelper, setterHelper, adderHelper, removerHelper } from '../abstraction';
import { LatLng, ILatLngOptions } from '../latlng';
import { Layer, ILayerOptions, createLayer } from '../layer';
import { IMap, IMapOptions } from './declaration';

export class Map extends Abstraction implements IMap {
    public center: LatLng;
    public domRoot: HTMLElement;
    public layers: Layer[];
    public zoom: number;

    constructor(opts: IMapOptions) {
        super();

        /* tslint:disable:no-null-keyword */
        var fallbackDom: any = null;
        /* tslint:enable:no-null-keyword */

        if (typeof document === 'object' && typeof document.createElement === 'function') {
            fallbackDom = document.createElement('div');
        }

        this.center = new LatLng(opts.center || {lat: 0, lng: 0});
        this.domRoot = opts.domRoot || fallbackDom;
        this.layers = [];
        this.zoom = opts.zoom || 1;

        for (let i: number = 0; i < opts.layers.length; i += 1) {
            let layer: Layer = createLayer(opts.layers[i]);
            layer.addToMap(this);
            this.layers.push(layer);
        }
    }

    public setCenter(value: ILatLngOptions, origin: any[] = []): Map {
        this.center.setLat(value.lat);
        this.center.setLng(value.lng);

        setterHelper(this, 'center', this.center, origin);
        return this;
    }
    public getCenter(): LatLng {
        return getterHelper(this, 'center');
    }

    public setZoom(value: number, origin: any[] = []): Map {
        setterHelper(this, 'zoom', value, origin);
        return this;
    }
    public getZoom(): number {
        return getterHelper(this, 'zoom');
    }

    public getDomRoot(): HTMLElement {
        return getterHelper(this, 'domRoot');
    }

    public addLayer(value: ILayerOptions, origin: any[] = []): Map {
        var layer: Layer = createLayer(value);
        layer.addToMap(this);
        adderHelper(this, 'layers', layer, origin);
        return this;
    };
    public removeLayer(value: Layer, origin: any[] = []): Map {
        value.removeFromMap(this);
        removerHelper(this, 'layers', value, origin);
        return this;
    };
    public getLayers(): Layer[] {
        return getterHelper(this, 'layers');
    };
    public setLayers(value: ILayerOptions[] = [], origin: any[] = []): Map {
        var i: number,
            layers: Layer[] = [];

        for (i = 0; i < this.layers.length; i += 1) {
            this.layers[i].removeFromMap(this);
        }

        for (i = 0; i < value.length; i += 1) {
            let layer: Layer = createLayer(value[i]);
            layer.addToMap(this);
            layers.push(layer);
        }

        setterHelper(this, 'layers', layers, origin);
        return this;
    };
}
