
import {Abstraction, getterHelper, setterHelper } from '../abstraction';

export interface ILatLngOptions {
    lat: number;
    lng: number;
    altitude?: number;
    timestamp?: number;
    accuracy?: number;
    altitudeAccuracy?: number;
}
export interface ILatLng extends ILatLngOptions {
    setLat(value: number, origin?: any[]): ILatLng;
    getLat(): number;
    setLng(value: number, origin?: any[]): ILatLng;
    getLng(): number;
    setAltitude(value: number, origin?: any[]): ILatLng;
    getAltitude(): number;

    distanceTo(otherLatLng: ILatLng): number;
    equals(otherLatLng: ILatLng): boolean;
}

export class LatLng extends Abstraction implements ILatLng {
    public lat: number;
    public lng: number;
    public altitude: number;
    public timestamp: number;
    public accuracy: number;
    public altitudeAccuracy: number;

    constructor(opts: ILatLngOptions) {
        super();
        this.timestamp = opts.timestamp || Date.now();
        this.accuracy = opts.accuracy;
        this.altitudeAccuracy = opts.altitudeAccuracy;
        this.lat = opts.lat;
        this.lng = opts.lng;
        this.altitude = opts.altitude;
    }

    public setLat(value: number, origin: any[] = []): LatLng {
        setterHelper(this, 'lat', value, origin);
        return this;
    }
    public getLat(): number {
        return getterHelper(this, 'lat');
    }
    public setLng(value: number, origin: any[] = []): LatLng {
        setterHelper(this, 'lng', value, origin);
        return this;
    }
    public getLng(): number {
        return getterHelper(this, 'lng');
    }
    public setAltitude(value: number, origin: any[] = []): LatLng {
        setterHelper(this, 'altitide', value, origin);
        return this;
    }
    public getAltitude(): number {
        return getterHelper(this, 'altitide');
    }

    public distanceTo(otherLatLng: ILatLng): number {
        var earthRadius: number = 6371000,
            rad: number = Math.PI / 180,
            lat1: number = this.lat * rad,
            lat2: number = otherLatLng.lat * rad,
            a: number = Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos((otherLatLng.lng - this.lng) * rad);

        return earthRadius * Math.acos(Math.min(a, 1));
    }

    public equals(otherLatLng: ILatLng, maxMargin: number = 1.0E-9): boolean {
        var margin: number = Math.max(
            Math.abs(this.lat - otherLatLng.lat),
            Math.abs(this.lng - otherLatLng.lng));
        return margin <= maxMargin;
    }
}
