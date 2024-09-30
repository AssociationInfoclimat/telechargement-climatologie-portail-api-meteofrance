import { RelativePercentage } from '@/data/value-objects/RelativePercentage.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidHumiditeRelativeError extends ValidationError {
    constructor(percentage: number) {
        super(`Invalid humidité relative: '${percentage}'. Must be an integer between 0 and 120.`);
    }
}

export class HumiditeRelative extends RelativePercentage {
    static of(percentage: number | null): HumiditeRelative {
        if (percentage !== null && !(0 <= percentage && percentage <= 120)) {
            throw new InvalidHumiditeRelativeError(percentage);
        }
        return new HumiditeRelative(percentage);
    }
}
