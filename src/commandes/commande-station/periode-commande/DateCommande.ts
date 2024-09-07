import { toSimpleISO } from '@/lib/date/toSimpleISO.js';
import { z } from 'zod';

export class DateCommande {
    private readonly date: string;

    private constructor(date: string) {
        this.date = date;
    }

    /**
     * @param date "YYYY-MM-DDThh:00:00Z", includes whole hour
     */
    static of(date: string): DateCommande {
        const schema = z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:00:00Z$/,
                `Invalid date format '${date}', should be 'YYYY-MM-DDThh:00:00Z'`
            );
        return new DateCommande(schema.parse(date));
    }

    static from(date: Date): DateCommande {
        return DateCommande.of(toSimpleISO(date));
    }

    value(): string {
        return this.date;
    }

    toDate(): Date {
        return new Date(this.date);
    }
}
