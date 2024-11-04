export class InvalidIdOMMError extends Error {
    constructor(id: string) {
        super(`Invalid OMM id: '${id}'. Must be 5 characters long.`);
    }
}

export class IdOMM {
    private readonly id: string | null;

    private constructor(id: string | null) {
        this.id = id;
    }

    /**
     * @param id "XXXXX"
     */
    static of(id: string): IdOMM {
        if (id === '') {
            return new IdOMM(null);
        }
        if (id.length !== 5) {
            throw new InvalidIdOMMError(id);
        }
        return new IdOMM(id);
    }

    value(): string | null {
        return this.id;
    }

    toString(): string {
        return this.value()?.toString() ?? '';
    }
}
