import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';

export class InvalidRelativePercentageError extends InvalidPositiveIntegerError {}

export class RelativePercentage extends PositiveInteger {
    static of(percentage: number | null): RelativePercentage {
        return new RelativePercentage(percentage);
    }
}
