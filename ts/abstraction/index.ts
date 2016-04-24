import { EventEmitter } from 'events';

export interface IAbstraction {
    // [/^set/: string]: setterFn
    // [/^get/: string]: getterFn
    // [/^add/: string]: adderFn
    // [/^remove/: string]: removererFn
    // [propertyName: string]: any
    // no target (reserved for driver)!
}

export class Abstraction extends EventEmitter implements IAbstraction {}

export function emitterHelper(self: Abstraction, action: string, attribute: string, value: any, origin: any[]): void {
    'use strict';
    origin.push(self);

    self.emit(action, attribute, value, origin);
    self.emit('watch', attribute, value, origin);
    self.emit(action + ':' + attribute, value, origin);
    self.emit('watch:' + attribute, value, origin);
}

export function getterHelper(self: Abstraction, attribute: string): any {
    'use strict';
    return self[attribute];
}
export function setterHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): Abstraction {
    'use strict';
    if (origin.indexOf(self) !== -1) {
        return;
    }
    emitterHelper(self, 'set', attribute, value, origin);

    self[attribute] = value;
    return self;
}

export function adderHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): Abstraction {
    'use strict';
    if (origin.indexOf(self) !== -1) {
        return self;
    }
    emitterHelper(self, 'add', attribute, value, origin);

    self[attribute].push(value);
    return self;
}

export function removerHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): Abstraction {
    'use strict';
    if (origin.indexOf(self) !== -1) {
        return self;
    }
    emitterHelper(self, 'remove', attribute, value, origin);

    self[attribute].splice(self[attribute].indexOf(value), 1);
    return self;
}

export function enableHelper(self: Abstraction, attribute: string, origin: any[] = []): Abstraction {
    'use strict';
    if (origin.indexOf(self) !== -1) {
        return self;
    }
    emitterHelper(self, 'enable', attribute, true, origin);

    self[attribute] = true;
    return self;
}
export function disableHelper(self: Abstraction, attribute: string, origin: any[] = []): Abstraction {
    'use strict';
    if (origin.indexOf(self) !== -1) {
        return self;
    }
    emitterHelper(self, 'disable', attribute, false, origin);

    self[attribute] = false;
    return self;
}
