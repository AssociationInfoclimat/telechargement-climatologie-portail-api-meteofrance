import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidJourError extends ValidationError {
    constructor(jour: PositiveInteger) {
        super(`Invalid jour: ${jour}. Must be an integer between 1 and 31.`);
    }
}

export class Jour {
    private readonly jour: PositiveInteger;

    private constructor(jour: PositiveInteger) {
        this.jour = jour;
    }

    static of(jour: PositiveInteger): Jour {
        const value = jour.value();
        if (value !== null && !(1 <= value && value <= 31)) {
            throw new InvalidJourError(jour);
        }
        return new Jour(jour);
    }

    value(): number | null {
        return this.jour.value();
    }

    toString(): string {
        return this.jour?.toString() ?? '';
    }
}
