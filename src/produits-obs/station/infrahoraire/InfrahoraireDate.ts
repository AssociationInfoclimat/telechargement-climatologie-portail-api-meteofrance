import { toSimpleISO } from '@/lib/date/toSimpleISO.js';
import { z } from 'zod';

export class InfrahoraireDate {
    private readonly date: string;

    private constructor(date: string) {
        this.date = date;
    }

    /**
     * @param date "YYYY-MM-DDThh:mm6:00Z" with mm6 in [00, 06, 12, 18, 24, 30, 36, 42, 48, 54]
     */
    static of(date: string): InfrahoraireDate {
        const schema = z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:(00)|(06)|(12)|(18)|(24)|(30)|(36)|(42)|(48)|(54):00Z$/,
                `Invalid date format '${date}', should be 'YYYY-MM-DDThh:mm6:00Z' with mm6 in [00, 06, 12, 18, 24, 30, 36, 42, 48, 54]`
            );
        return new InfrahoraireDate(schema.parse(date));
    }

    static from(date: Date): InfrahoraireDate {
        return InfrahoraireDate.of(toSimpleISO(date));
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
