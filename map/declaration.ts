
export interface IMapOptions {
    center: any; // ILatLngOptions;
    zoom: number;
    domRoot?: HTMLElement;
    layers?: any; // ILayerOptions[]; *recursive dependency*
}
export interface IMap extends IMapOptions {
    center: any; // LatLngAbstraction;
    domRoot: HTMLElement;
    layers: any[]; // LayerAbstraction[];

    setCenter(centerLatLng: any, origin?: any[]): IMap; // ILatLngOptions
    getCenter(): any; // LatLngAbstraction

    setZoom(level: number, origin?: any[]): IMap;
    getZoom(): number;

    getDomRoot(): HTMLElement;

    addLayer(layer: any, origin?: any[]): IMap; // ILayerOptions
    setLayers(layers: any[], origin?: any[]): IMap; // ILayerOptions[]
    removeLayer(layer: any, origin?: any[]): IMap; // ILayerOptions
    getLayers(): any[]; // LayerAbstraction

}
