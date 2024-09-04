import { Departement, InvalidDepartementError } from '@/stations/liste-stations/departements/Departement.js';
import { describe, expect, it } from 'vitest';

describe('Departement', () => {
    describe('of', () => {
        it('should allow from 1 to 95', () => {
            expect(Departement.of(1).value()).toEqual(1);
            expect(Departement.of(95).value()).toEqual(95);
        });

        it('should allow from 971 to 975', () => {
            expect(Departement.of(971).value()).toEqual(971);
            expect(Departement.of(975).value()).toEqual(975);
        });

        it('should allow from 984 to 988', () => {
            expect(Departement.of(984).value()).toEqual(984);
            expect(Departement.of(988).value()).toEqual(988);
        });

        it('should not allow anything else', () => {
            expect(() => Departement.of(0)).toThrow(InvalidDepartementError);
            expect(() => Departement.of(96)).toThrow(InvalidDepartementError);
            expect(() => Departement.of(970)).toThrow(InvalidDepartementError);
            expect(() => Departement.of(976)).toThrow(InvalidDepartementError);
            expect(() => Departement.of(983)).toThrow(InvalidDepartementError);
            expect(() => Departement.of(989)).toThrow(InvalidDepartementError);
        });
    });
});
