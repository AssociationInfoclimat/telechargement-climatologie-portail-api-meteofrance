import { Etat, InvalidEtatError } from '@/csv/horaires/value-objects/Etat.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('Etat', () => {
    describe('of', () => {
        it('should accept between 0 and 9, and null', () => {
            expect(Etat.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(Etat.of(PositiveInteger.of(9)).value()).toEqual(9);
            expect(Etat.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => Etat.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => Etat.of(PositiveInteger.of(10))).toThrow(InvalidEtatError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(Etat.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(Etat.of(PositiveInteger.of(9)).toString()).toEqual('9');
            expect(Etat.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
