
import { Abstraction, setterHelper, getterHelper } from '../abstraction';
import { Point } from '../point';

export interface ITransformationOptions {
    a: number;
    b: number;
    c: number;
    d: number;
}
export interface ITransformation extends ITransformationOptions {

    setA(value: number, origin?: any[]): void;
    setB(value: number, origin?: any[]): void;
    setC(value: number, origin?: any[]): void;
    setD(value: number, origin?: any[]): void;

    getA(): number;
    getB(): number;
    getC(): number;
    getD(): number;

    transform(point: Point, scale?: number, clone?: boolean): Point;
    // on('beforeTransform', () => void): ITransformation;
}

export class Transformation extends Abstraction implements ITransformation {

    public a: number;
    public b: number;
    public c: number;
    public d: number;
    constructor(opts: ITransformationOptions) {
        super();
        this.a = opts.a || 1;
        this.b = opts.b || 0;
        this.c = opts.c || 1;
        this.d = opts.d || 0;

        // proposal: no transformation as default? At the moment as fallback...

    }

    public transform(point: Point, scale: number = 1, clone: boolean = false): Point {
        var result: Point = clone ? point.clone() : point;

        this.emit('beforeTransform', result, scale, clone);
        point.x = scale * (this.a * point.x + this.b);
        point.y = scale * (this.c * point.y + this.d);
        this.emit('afterTransform', result, scale, clone);

        return result;
    }
    public untransform(point: Point, scale: number = 1, clone: boolean = false): Point {
        var result: Point = clone ? point.clone() : point;

        this.emit('beforeUntransform', result, scale, clone);
        point.x = (point.x / scale - this.b) / this.a;
        point.y = (point.y / scale - this.d) / this.c;
        this.emit('afterUntransform', result, scale, clone);

        return result;
    }


    public setA(value: number, origin: any[] = []): void {
        setterHelper(this, 'a', value, origin);
    }
    public setB(value: number, origin: any[] = []): void {
        setterHelper(this, 'b', value, origin);
    }
    public setC(value: number, origin: any[] = []): void {
        setterHelper(this, 'c', value, origin);
    }
    public setD(value: number, origin: any[] = []): void {
        setterHelper(this, 'd', value, origin);
    }

    public getA(): number {
        return getterHelper(this, 'a');
    }
    public getB(): number {
        return getterHelper(this, 'b');
    }
    public getC(): number {
        return getterHelper(this, 'c');
    }
    public getD(): number {
        return getterHelper(this, 'd');
    }
}