import { parseInteger } from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidTimeError extends ValidationError {
    constructor(hhmm: string) {
        super(`Invalid time: '${hhmm}'. Must be a string of 4 characters 'hhmm', between '0000' and '2359'.`);
    }
}

interface HHMM {
    hh: string;
    mm: string;
}

export class Time {
    private readonly hhmm: HHMM | null;

    private constructor(hhmm: HHMM | null) {
        this.hhmm = hhmm;
    }

    static of(hhmm: string): Time {
        if (hhmm === '') {
            return new Time(null);
        }
        hhmm = hhmm.padStart(4, '0');
        if (hhmm.length !== 4) {
            throw new InvalidTimeError(hhmm);
        }
        const hh = hhmm.slice(''.length, 'hh'.length);
        const mm = hhmm.slice('hh'.length, 'hhmm'.length);
        if (parseInteger(hh) >= 24 || parseInteger(mm) >= 60) {
            throw new InvalidTimeError(hhmm);
        }
        return new Time({ hh, mm });
    }

    hh(): string | null {
        return this.hhmm?.hh ?? null;
    }

    mm(): string | null {
        return this.hhmm?.mm ?? null;
    }

    value(): string | null {
        return this.hhmm !== null ? `${this.hhmm.hh}${this.hhmm.mm}` : null;
    }

    toString(): string {
        return this.value() ?? '';
    }
}
