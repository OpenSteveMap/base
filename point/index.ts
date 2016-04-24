
import {Abstraction, getterHelper, setterHelper} from '../abstraction';

export interface IPointOptions {
    x: number;
    y: number;
}
export interface IPoint extends IPointOptions {
    setX(value: number, origin?: any[]): IPoint;
    getX(): number;
    setY(value: number, origin?: any[]): IPoint;
    getY(): number;

    clone(): IPoint;

    add(point: IPointOptions, origin?: any[]): IPoint;
    silentAdd(point: IPointOptions): IPoint;

    silentSubtract(point: IPointOptions): IPoint;
    subtract(point: IPointOptions, origin?: any[]): IPoint;

    silentDivideBy(num: number): IPoint;
    divideBy(num: number, origin?: any[]): IPoint;

    silentMultiplyBy(num: number): IPoint;
    multiplyBy(num: number, origin?: any[]): IPoint;

    silentScaleBy(point: IPointOptions): IPoint;
    scaleBy(point: IPointOptions, origin?: any[]): IPoint;

    silentUnscaleBy(point: IPointOptions): IPoint;
    unscaleBy(point: IPointOptions, origin?: any[]): IPoint;

    silentRound(): IPoint;
    round(origin?: any[]): IPoint;

    silentFloor(): IPoint;
    floor(origin?: any[]): IPoint;

    silentCeil(): IPoint;
    ceil(origin?: any[]): IPoint;

    distanceTo(point: IPointOptions): number;
    equals(point: IPointOptions): boolean;
    contains(point: IPointOptions): boolean;
}

export class Point extends Abstraction implements IPoint {
    public x: number;
    public y: number;

    constructor(opts: IPointOptions, round?: boolean) {
        super();
        this.x = (round ? Math.round(opts.x) : opts.x);
        this.y = (round ? Math.round(opts.y) : opts.y);
    }

    public setX(value: number, origin: any[] = []): Point {
        setterHelper(this, 'x', value, origin);
        return this;
    }
    public getX(): number {
        return getterHelper(this, 'x');
    }
    public setY(value: number, origin: any[] = []): Point {
        setterHelper(this, 'y', value, origin);
        return this;
    }
    public getY(): number {
        return getterHelper(this, 'y');
    }
    public clone(): Point {
        this.emit('clone'); // do not emit with helper, because we do not want to call a 'watch'!
        return new Point(this);
    }
    public add(point: IPointOptions, origin: any[] = []): Point {
        origin.push(this);
        this.emit('add', point, origin);
        this.silentAdd(point);
        this.emit('change');
        return this;
    }
    public silentAdd(point: IPointOptions): Point {
        this.x += point.x;
        this.y += point.y;
        return this;
    }


    public subtract(point: IPointOptions, origin: any[] = []): Point {
        origin.push(this);
        this.emit('subtract', point, origin);
        this.silentSubtract(point);
        this.emit('change');
        return this;
    }
    public silentSubtract(point: IPointOptions): Point {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }


    public scaleBy(point: IPointOptions, origin: any[] = []): Point {
        origin.push(this);
        this.emit('scaleBy', point, origin);
        this.silentScaleBy(point);
        this.emit('change');
        return this;
    }
    public silentScaleBy(point: IPointOptions): Point {
        this.x *= point.x;
        this.y *= point.y;
        // this.altitude *= point.altitude || 0;
        return this;
    }


    public unscaleBy(point: IPointOptions, origin: any[] = []): Point {
        origin.push(this);
        this.emit('unscaleBy', point, origin);
        this.silentUnscaleBy(point);
        this.emit('change');
        return this;
    }
    public silentUnscaleBy(point: IPointOptions): Point {
        this.x = this.x / point.x;
        this.y = this.y / point.y;
        return this;
    }


    public divideBy(num: number, origin: any[] = []): Point {
        origin.push(this);
        this.emit('divideBy', num, origin);
        this.silentDivideBy(num);
        this.emit('change');
        return this;
    }
    public silentDivideBy(num: number): Point {
        this.x /= num;
        this.y /= num;
        return this;
    }


    public multiplyBy(num: number, origin: any[] = []): Point {
        origin.push(this);
        this.emit('multiplyBy', num, origin);
        this.silentMultiplyBy(num);
        this.emit('change');
        return this;
    }
    public silentMultiplyBy(num: number): Point {
        this.x *= num;
        this.y *= num;
        return this;
    }


    public round(origin: any[] = []): Point {
        origin.push(this);
        this.emit('round', this, origin);
        this.silentRound();
        this.emit('change');
        return this;
    }
    public silentRound(): Point {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }


    public floor(origin: any[] = []): Point {
        origin.push(this);
        this.emit('floor', this, origin);
        this.silentFloor();
        this.emit('change');
        return this;
    }
    public silentFloor(): Point {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }


    public ceil(origin: any[] = []): Point {
        origin.push(this);
        this.emit('ceil', this, origin);
        this.silentCeil();
        this.emit('change');
        return this;
    }
    public silentCeil(): Point {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }


    public distanceTo(point: IPointOptions, withAltitude?: boolean): number {
        var x: number = point.x - this.x,
            y: number = point.y - this.y;

        return Math.sqrt(x * x + y * y);
    }
    public equals(point: IPointOptions): boolean {
        return point.x === this.x && point.y === this.y;
    }
    public contains(point: IPointOptions): boolean {
        return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
    }


}
