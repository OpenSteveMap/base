
import { getterHelper, setterHelper } from '../abstraction';
import { Layer, ILayerOptions, registerLayerType, ILayer } from '../layer';

export interface ITileLayerOptions extends ILayerOptions {
    type: 'tile';
    url: string;
}

export interface ITileLayer extends ILayer {
    setUrl(url: string, origin?: any[]): ITileLayer;
    getUrl(): string;
}

export class TileLayer extends Layer implements ITileLayer {
    public url: string;

    constructor(opts: ITileLayerOptions) {
        opts.type = 'tile';
        super(opts);

        this.url = opts.url;
    }

    public setUrl(url: string, origin: any[] = []): TileLayer {
        setterHelper(this, 'url', url, origin);
        return this;
    }
    public getUrl(): string {
        return getterHelper(this, 'url');
    }
}

registerLayerType('tile', TileLayer);
