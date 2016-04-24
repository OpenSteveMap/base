
import { Abstraction } from '../abstraction';

export interface IDriver extends Abstraction {
    target: any;
}

export class Driver extends Abstraction implements IDriver {
    public target: any;
    protected changePropagated: boolean;

    protected propagateChange(): void {
        this.changePropagated = true;
        setTimeout((): void => {
            this.changePropagated = false;
        }, 0);
    }
}
