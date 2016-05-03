
import { getterHelper, setterHelper, adderHelper, removerHelper } from '../abstraction';
import { Layer, ILayerOptions, registerLayerType, ILayer } from '../layer';
import * as cheerio from 'cheerio';

export interface IWmsLayerOptions extends ILayerOptions {
    type: 'wms';
    url: string;
    layers?: string[];
}
// mybe implement later: a structural layer tree
// export interface IWmsLayerEntry {
//     name: string;
//     layers?: IWmsLayerEntry[];
// }

export interface IWmsLayer extends ILayer {
    availableLayers: string[];

    setUrl(url: string, origin?: any[]): IWmsLayer;
    getUrl(): string;
    setLayers(layers: string[], origin?: any[]): IWmsLayer;
    addLayer(layer: string, origin?: any[]): IWmsLayer;
    removeLayer(layer: string, origin?: any[]): IWmsLayer;
    getLayers(): string[];

    parseCapabilities(xml: string): IWmsLayer;
}

export class WmsLayer extends Layer implements IWmsLayer {
    public url: string;
    public layers: string[];
    public availableLayers: string[];

    constructor(opts: IWmsLayerOptions) {
        opts.type = 'wms';
        super(opts);

        this.url = opts.url;
        this.layers = opts.layers || [];
    }
    public setUrl(url: string, origin: any[] = []): WmsLayer {
        setterHelper(this, 'url', url, origin);
        // download in driver and call parseCapabilities!
        return this;
    }
    public getUrl(): string {
        return getterHelper(this, 'url');
    }
    public setLayers(layers: string[], origin: any[] = []): WmsLayer {
        setterHelper(this, 'layers', layers, origin);
        return this;
    }
    public addLayer(layer: string, origin: any[] = []): WmsLayer {
        adderHelper(this, 'layers', layer, origin);
        return this;
    }
    public removeLayer(layer: string, origin: any[] = []): WmsLayer {
        removerHelper(this, 'layers', layer, origin);
        return this;
    }
    public getLayers(): string[] {
        return getterHelper(this, 'layers');
    }

    public parseCapabilities(xml: string): WmsLayer {
        var $: CheerioStatic = cheerio.load(xml);
        this.availableLayers = [];

        $('Layer > Name').each((i: number, elem: CheerioElement): void => {
            this.availableLayers.push($(elem).text());
        });

        // Layertree
        $('Layer').each((i: number, elem: CheerioElement): void => {
            var $elem: Cheerio = $(elem);

            $elem.find('Name'); // -> this is the name of this layer

            // this.layerTree = $elem.find('Name');

            $elem.find('Layer'); // -> Sublayer
        });


        if (!this.layers.length) {
            this.layers.push.apply(this.layers, this.availableLayers);
        }
        return this;
    }


}

registerLayerType('wms', WmsLayer);
