import { PositiveNumber } from '@/data/value-objects/PositiveNumber.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidPositiveFloatError extends ValidationError {
    constructor(value: number) {
        super(`Invalid positive float: '${value}'. Must be greater than or equal to 0.`);
    }
}

export class PositiveFloat extends PositiveNumber {
    static of(value: number | null): PositiveFloat {
        if (value !== null && value < 0) {
            throw new InvalidPositiveFloatError(value);
        }
        return new PositiveFloat(value);
    }

    toString(): string {
        if (this.v === null) {
            return '';
        }
        const s = this.v.toString();
        return s.includes('.') ? s : `${s}.0`;
    }
}
