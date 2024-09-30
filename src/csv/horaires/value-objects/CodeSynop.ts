import { parseInteger } from '@/csv/parseCSVUtils.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidCodeSynopError extends ValidationError {
    constructor(code: string | number) {
        super(`Invalid code synop: '${code}'. Must be an integer between 0 and 9, or /.`);
    }
}

export class CodeSynop {
    private readonly code: string | PositiveInteger | null;

    private constructor(code: string | PositiveInteger | null) {
        this.code = code;
    }

    static of(code: string | number): CodeSynop {
        if (code === '/') {
            return new CodeSynop('/');
        }
        if (code === '') {
            return new CodeSynop(null);
        }
        if (typeof code === 'string') {
            code = parseInteger(code);
        }
        if (!(0 <= code && code <= 9)) {
            throw new InvalidCodeSynopError(code);
        }
        return new CodeSynop(PositiveInteger.of(code));
    }

    value(): string | number | null {
        return this.code instanceof PositiveInteger ? this.code.value() : this.code;
    }

    toString(): string {
        return this.code?.toString() ?? '';
    }
}
