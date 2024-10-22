import { toSimpleISO } from '@/lib/date/toSimpleISO.js';
import { z } from 'zod';

export class HoraireDate {
    private readonly date: string;

    private constructor(date: string) {
        this.date = date;
    }

    /**
     * @param date "YYYY-MM-DDThh:00:00Z"
     */
    static of(date: string): HoraireDate {
        const schema = z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:00:00Z$/,
                `Invalid date format '${date}', should be 'YYYY-MM-DDThh:00:00Z'`
            );
        return new HoraireDate(schema.parse(date));
    }

    static from(date: Date): HoraireDate {
        return HoraireDate.of(toSimpleISO(date));
    }

    value(): string {
        return this.date;
    }

    toDate(): Date {
        return new Date(this.date);
    }

    toString(): string {
        return this.date;
    }
}
