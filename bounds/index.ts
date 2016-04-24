
import { Abstraction, setterHelper, getterHelper } from '../abstraction';
import { Point, IPointOptions } from '../point';

export interface IBoundsOptions {
    min?: IPointOptions;
    max?: IPointOptions;
}

export interface IBounds extends IBoundsOptions {
    min: Point;
    max: Point;

    setMax(point: IPointOptions, origin?: any[]): IBounds;
    setMin(point: IPointOptions, origin?: any[]): IBounds;

    getMax(): Point;
    getMin(): Point;

    extend(point: IPointOptions): IBounds;
    getCenter(): Point;
    getBottomLeft(): Point;
    getTopRight(): Point;
    getTopLeft(): Point;
    getBottomRight(): Point;
    getSize(): Point;
    contains(point: IPointOptions): IBounds;
    intersects(point: IPointOptions): IBounds;
    overlaps(point: IPointOptions): IBounds;
}

export default class Bounds extends Abstraction implements IBounds {
    public min: Point;
    public max: Point;

    private empty: boolean;

    constructor(opts: IBoundsOptions) {
        super();
        if (!opts.min && !opts.max) {
            this.empty = true;
        }

        if (opts.max) {
            this.extend(opts.max);
        }
        if (opts.min) {
            this.extend(opts.min);
        }

        if (opts.max && !opts.min) {
            opts.min = opts.max;
        } else if (!opts.max && opts.min) {
            opts.max = opts.min;
        }

        if (!Point.prototype.isPrototypeOf(opts.max)) {
            this.max = new Point(opts.max);
        } else {
            let typeChange: any = opts.max;
            this.max = typeChange;
        }
        if (!Point.prototype.isPrototypeOf(opts.min)) {
            this.min = new Point(opts.min);
        } else {
            let typeChange: any = opts.min;
            this.min = typeChange;
        }
    }

    public extend(point: IPointOptions): Bounds {
        this.emit('extend', point);
        if (this.empty) {
            this.empty = false;
            this.max = new Point(point);
            this.min = new Point(point);
            return this;
        }

        this.min.setX(Math.min(point.x, this.min.x), [this]);
        this.max.setX(Math.max(point.x, this.max.x), [this]);

        this.min.setY(Math.min(point.y, this.min.y), [this]);
        this.max.setY(Math.max(point.y, this.max.y), [this]);

        return this;
    }

    public getCenter(): Point {
        return new Point({
            // altitude: this.min.altitude && this.max.altitude ? (this.min.getAltitude() + this.max.getAltitude()) / 2 : undefined,
            x: (this.min.getX() + this.max.getX()) / 2,
            y: (this.min.getY() + this.max.getY()) / 2
        });
    }

    public getBottomLeft(): Point {
        return new Point({
            x: this.min.getX(),
            y: this.max.getY()
        });
    }

    public getTopRight(): Point {
        return new Point({
            x: this.max.getX(),
            y: this.min.getY()
        });
    }

    public getTopLeft(): Point {
        return new Point(this.max);
    }

    public getBottomRight(): Point {
        return new Point(this.min);
    }

    public getSize(): Point {
        return new Point({
            x: this.max.getX(),
            y: this.max.getY()
        });
    }



    public setMax(point: IPointOptions, origin: any[] = []): Bounds {
        var typeChange: any = point;

        if (!Point.prototype.isPrototypeOf(point)) {
            typeChange = new Point(point);
        } else {
            typeChange = point;
        }
        setterHelper(this, 'max', typeChange, origin);
        return this;
    }
    public setMin(point: IPointOptions, origin: any[] = []): Bounds {
        var typeChange: any = point;

        if (!Point.prototype.isPrototypeOf(point)) {
            this.min = new Point(point);
        } else {
            typeChange = point;
        }
        setterHelper(this, 'min', typeChange, origin);
        return this;
    }

    public getMax(): Point {
        return getterHelper(this, 'max');
    }
    public getMin(): Point {
        return getterHelper(this, 'min');
    }


    public contains(point: IPointOptions): Bounds {
        throw new Error('Not implemented'); // todo: <---
        // return this;
    }
    public intersects(point: IPointOptions): Bounds {
        throw new Error('Not implemented'); // todo: <---
        // return this;
    }
    public overlaps(point: IPointOptions): Bounds {
        throw new Error('Not implemented'); // todo: <---
        // return this;
    }

}

