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
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:00:00Z$/, 'Invalid date format, should be "YYYY-MM-DDThh:00:00Z"');
        return new DateCommande(schema.parse(date));
    }

    value(): string {
        return this.date;
    }
}
