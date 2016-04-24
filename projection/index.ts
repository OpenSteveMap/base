
import {LatLng, ILatLngOptions} from '../latlng';
import {Point, IPointOptions} from '../point';

export interface IProjection {
    project(latlng: ILatLngOptions): Point;
    unproject(point: IPointOptions): LatLng;
}

export class LonLat implements IProjection {
    public project(latlng: ILatLngOptions): Point {
        return new Point({x: latlng.lng, y: latlng.lat});
    }
    public unproject(point: IPointOptions): LatLng {
        return new LatLng({lat: point.y, lng: point.x});
    }
}

export class Mercator implements IProjection {
    public static R: number = 6378137;
    public static R_MINOR: number = 6356752.314245179;


    public project(latlng: ILatLngOptions): Point {

        var d: number = Math.PI / 180,
            r: number = Mercator.R,
            y: number = latlng.lat * d,
            tmp: number = Mercator.R_MINOR / r,
            e: number = Math.sqrt(1 - tmp * tmp),
            con: number = e * Math.sin(y),

            ts: number = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);

        y = -r * Math.log(Math.max(ts, 1E-10));

        return new Point({x: latlng.lng * d * r, y: y});
    }
    public unproject(point: IPointOptions): LatLng {

        var d: number = 180 / Math.PI,
            r: number = Mercator.R,
            tmp: number = Mercator.R_MINOR / r,
            e: number = Math.sqrt(1 - tmp * tmp),
            ts: number = Math.exp(-point.y / r),
            phi: number = Math.PI / 2 - 2 * Math.atan(ts);

        for (let i: number = 0, dphi: number = 0.1, con: number; i < 15 && Math.abs(dphi) > 1e-7; i += 1) {
            con = e * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
        }

        return new LatLng({lat: phi * d, lng: point.x * d / r});
    }
}
export var mercator: Mercator = new Mercator();

export class SphericalMercator implements IProjection {
    public static R: number = 6378137;
    public static MAX_LATITUDE: number = 85.0511287798;

    public project(latlng: ILatLngOptions): Point {
        var d: number = Math.PI / 180,
            max: number = SphericalMercator.MAX_LATITUDE,
            lat: number = Math.max(Math.min(max, latlng.lat), -max),
            sin: number = Math.sin(lat * d);

        return new Point({
            x: SphericalMercator.R * latlng.lng * d,
            y: SphericalMercator.R * Math.log((1 + sin) / (1 - sin)) / 2
        });


    }
    public unproject(point: IPointOptions): LatLng {
        var d: number = 180 / Math.PI;

        return new LatLng({
            lat: (2 * Math.atan(Math.exp(point.y / SphericalMercator.R)) - (Math.PI / 2)) * d,
            lng: point.x * d / SphericalMercator.R
        });

    }
}
export var sphericalMercator: SphericalMercator = new SphericalMercator();
