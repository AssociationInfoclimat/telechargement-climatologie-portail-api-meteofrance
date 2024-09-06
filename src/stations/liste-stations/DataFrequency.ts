const DATA_FREQUENCY_TYPES: string[] = ['infrahoraire-6m', 'horaire', 'quotidienne'];

export class DataFrequency {
    private readonly type: string;

    private constructor(type: string) {
        this.type = type;
    }

    static of(type: string): DataFrequency {
        if (!DATA_FREQUENCY_TYPES.includes(type)) {
            throw new Error(`Invalid data frequency: ${type}`);
        }
        return new DataFrequency(type);
    }

    value(): string {
        return this.type;
    }
}
