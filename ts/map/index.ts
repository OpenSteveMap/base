
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
        this.layers = opts.layers || [];
        this.zoom = opts.zoom || 1;
    }

    public setCenter(value: ILatLngOptions, origin: any[] = []): void {
        this.center.setLat(value.lat);
        this.center.setLng(value.lng);

        setterHelper(this, 'center', this.center, origin);
    }
    public getCenter(): LatLng {
        return getterHelper(this, 'center');
    }

    public setZoom(value: number, origin: any[] = []): void {
        setterHelper(this, 'zoom', value, origin);
    }
    public getZoom(): number {
        return getterHelper(this, 'zoom');
    }

    public getDomRoot(): HTMLElement {
        return getterHelper(this, 'domRoot');
    }

    public addLayer(value: ILayerOptions, origin: any[] = []): void {
        adderHelper(this, 'layers', createLayer(value, this), origin);
    };
    public removeLayer(value: ILayerOptions, origin: any[] = []): void {
        removerHelper(this, 'layers', value, origin);
    };
    public getLayers(): Layer[] {
        return getterHelper(this, 'layers');
    };
    public setLayers(value: ILayerOptions[] = [], origin: any[] = []): void {
        var i: number,
            layers: Layer[] = [];

        for (i = 0; i < value.length; i += 1) {
            layers.push(createLayer(value[i], this));
        }

        setterHelper(this, 'layers', layers, origin);
    };
}
