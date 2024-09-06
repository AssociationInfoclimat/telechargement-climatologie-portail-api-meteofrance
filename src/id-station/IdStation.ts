export class InvalidIdStationError extends Error {
    constructor(id: string) {
        super(
            `Invalid station id: '${id}'. Must be 8 characters long. nomenclature : 8 chiffres selon DDCCCNNN = insee de la commune (DD département, CCC n° de la commune dans le département et NNN n° de la station dans la commune`
        );
    }
}

export class IdStation {
    private readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    /**
     * @param id "DDCCCNNN" nomenclature : 8 chiffres selon DDCCCNNN = insee de la commune (DD département, CCC n° de la commune dans le département et NNN n° de la station dans la commune
     */
    static of(id: string | number): IdStation {
        if (typeof id === 'number') {
            id = id.toString();
            if (id.length !== 7 && id.length !== 8) {
                throw new InvalidIdStationError(id);
            }
            id = id.padStart(8, '0');
        }
        if (id.length !== 8) {
            throw new InvalidIdStationError(id);
        }
        return new IdStation(id);
    }

    value(): string {
        return this.id;
    }
}
