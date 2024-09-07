const COMMANDE_STATUS_TYPES: string[] = ['pending', 'done', 'error'];

export class CommandeStationStatus {
    private readonly status: string;

    private constructor(status: string) {
        this.status = status;
    }

    static of(status: string): CommandeStationStatus {
        if (!COMMANDE_STATUS_TYPES.includes(status)) {
            throw new Error(`Invalid commande status: ${status}`);
        }
        return new CommandeStationStatus(status);
    }

    value(): string {
        return this.status;
    }
}
