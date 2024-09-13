const DATA_FREQUENCY_TYPES: string[] = ['infrahoraire-6m', 'horaire', 'quotidienne'];

export class DataFrequency {
    private readonly frequence: string;

    private constructor(type: string) {
        this.frequence = type;
    }

    static of(frequence: string): DataFrequency {
        if (!DATA_FREQUENCY_TYPES.includes(frequence)) {
            throw new Error(`Invalid data frequency: ${frequence}`);
        }
        return new DataFrequency(frequence);
    }

    value(): string {
        return this.frequence;
    }

    toString(): string {
        return this.value().toString();
    }
}
