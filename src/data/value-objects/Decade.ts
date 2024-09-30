import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidDecadeError extends ValidationError {
    constructor(decade: PositiveInteger) {
        super(`Invalid decade : '${decade}'. Must be an integer between 1 and 3.`);
    }
}

export class Decade {
    private readonly decade: number;

    private constructor(decade: number) {
        this.decade = decade;
    }

    static of(decade: PositiveInteger): Decade {
        const value = decade.value();
        if (value === null || !(1 <= value && value <= 3)) {
            throw new InvalidDecadeError(decade);
        }
        return new Decade(value);
    }

    value(): number {
        return this.decade;
    }

    toString(): string {
        return this.decade.toString();
    }
}
