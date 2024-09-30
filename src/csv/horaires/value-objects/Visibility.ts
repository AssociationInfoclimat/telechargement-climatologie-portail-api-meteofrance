import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidVisibilityError extends ValidationError {
    constructor(visibility: PositiveInteger) {
        super(`Invalid visibility: '${visibility}'. Must be an integer between 0 and 9.`);
    }
}

export class Visibility {
    private readonly visibility: PositiveInteger;

    private constructor(visibility: PositiveInteger) {
        this.visibility = visibility;
    }

    static of(visibility: PositiveInteger): Visibility {
        const value = visibility.value();
        if (value !== null && !(0 <= value && value <= 9)) {
            throw new InvalidVisibilityError(visibility);
        }
        return new Visibility(visibility);
    }

    value(): number | null {
        return this.visibility.value();
    }

    toString(): string {
        return this.visibility?.toString() ?? '';
    }
}
