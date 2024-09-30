import { Integer } from '@/data/value-objects/Integer.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidCodeQualiteError extends ValidationError {
    constructor(code: Integer) {
        super(`Invalid code qualité: '${code}'. Must be -1, 0, 1, 2 or 9.`);
    }
}

export class CodeQualite {
    private readonly code: PositiveInteger;

    private constructor(code: PositiveInteger) {
        this.code = code;
    }

    static of(code: Integer): CodeQualite {
        const value = code.value();
        if (value !== null && ![-1, 0, 1, 2, 9].includes(value)) {
            throw new InvalidCodeQualiteError(code);
        }
        return new CodeQualite(PositiveInteger.of(code.value() === -1 ? null : code.value()));
    }

    value(): number | null {
        return this.code.value();
    }

    toString(): string {
        return this.code?.toString() ?? '';
    }
}
