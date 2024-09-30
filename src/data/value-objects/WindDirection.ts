import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidWindDirectionError extends ValidationError {
    constructor(degrees: PositiveInteger) {
        super(`Invalid wind direction: '${degrees}'. Must be an integer between 0 and 360.`);
    }
}

export class WindDirection {
    private readonly degrees: PositiveInteger;

    private constructor(degrees: PositiveInteger) {
        this.degrees = degrees;
    }

    static of(degrees: PositiveInteger): WindDirection {
        const value = degrees.value();
        if (value !== null && !(0 <= value && value <= 360)) {
            throw new InvalidWindDirectionError(degrees);
        }
        return new WindDirection(degrees.value() === 360 ? PositiveInteger.of(0) : degrees);
    }

    value(): number | null {
        return this.degrees.value();
    }

    toString(): string {
        return this.degrees?.toString() ?? '';
    }
}
