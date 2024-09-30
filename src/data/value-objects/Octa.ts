import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidOctaError extends ValidationError {
    constructor(octa: PositiveInteger) {
        super(`Invalid octa: '${octa}'. Must be an integer between 0 and 9.`);
    }
}

export class Octa {
    private readonly octa: PositiveInteger;

    private constructor(octa: PositiveInteger) {
        this.octa = octa;
    }

    static of(octa: PositiveInteger): Octa {
        const value = octa.value();
        if (value !== null && !(0 <= value && value <= 9)) {
            throw new InvalidOctaError(octa);
        }
        return new Octa(octa);
    }

    value(): number | null {
        return this.octa.value();
    }

    toString(): string {
        return this.octa?.toString() ?? '';
    }
}
