import { parseInteger } from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidCodeTempsError extends ValidationError {
    constructor(code: string) {
        super(`Invalid code temps: '${code}'. Must be a string of 2 characters between 00 and 99.`);
    }
}

export class CodeTemps {
    private readonly code: string | null;

    private constructor(code: string | null) {
        this.code = code;
    }

    static of(code: string): CodeTemps {
        if (code === '') {
            return new CodeTemps(null);
        }
        code = code.padStart(2, '0');
        if (!(code.length === 2 && 0 <= parseInteger(code) && parseInteger(code) <= 99)) {
            throw new InvalidCodeTempsError(code);
        }
        return new CodeTemps(code);
    }

    value(): string | null {
        return this.code;
    }

    toString(): string {
        return this.code ?? '';
    }
}
