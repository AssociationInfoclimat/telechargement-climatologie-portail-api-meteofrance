import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidPercentageError extends ValidationError {
    constructor(percentage: PositiveInteger) {
        super(`Invalid percentage: '${percentage}'. Must be an integer between 0 and 100.`);
    }
}

export class Percentage {
    private readonly percentage: PositiveInteger;

    private constructor(percentage: PositiveInteger) {
        this.percentage = percentage;
    }

    static of(percentage: PositiveInteger): Percentage {
        const value = percentage.value();
        if (value !== null && !(0 <= value && value <= 100)) {
            throw new InvalidPercentageError(percentage);
        }
        return new Percentage(percentage);
    }

    value(): number | null {
        return this.percentage.value();
    }

    toString(): string {
        return this.percentage?.toString() ?? '';
    }
}
