export class InvalidDepartementError extends Error {
    constructor(numero: number) {
        super(
            `Invalid departement: '${numero}'. Must be between 1 and 95, or 99, or between 971 and 975, or between 984 and 988.`
        );
    }
}

export class Departement {
    private readonly numero: number;

    private constructor(departement: number) {
        this.numero = departement;
    }

    static of(numero: number): Departement {
        if (
            !(
                (1 <= numero && numero <= 95) ||
                numero === 99 ||
                (971 <= numero && numero <= 975) ||
                (984 <= numero && numero <= 988)
            )
        ) {
            throw new InvalidDepartementError(numero);
        }
        return new Departement(numero);
    }

    value(): number {
        return this.numero;
    }

    toString(): string {
        return this.numero.toString();
    }
}
