import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidIntegerError extends ValidationError {
    constructor(value: number) {
        super(`Invalid integer: '${value}'. Must not be a float.`);
    }
}

export class Integer {
    protected readonly v: number | null;

    protected constructor(value: number | null) {
        this.v = value;
    }

    static of(value: number | null): Integer {
        if (value !== null && !Number.isInteger(value)) {
            throw new InvalidIntegerError(value);
        }
        return new Integer(value);
    }

    value(): number | null {
        return this.v;
    }

    toString(): string {
        return this.v?.toString() ?? '';
    }
}
