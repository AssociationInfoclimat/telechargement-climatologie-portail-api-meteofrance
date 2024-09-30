import { InvalidNbJoursError, NbJours } from '@/data/value-objects/NbJours.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('NbJours', () => {
    describe('of', () => {
        it('should accept between 0 and 31, and null', () => {
            expect(NbJours.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(NbJours.of(PositiveInteger.of(31)).value()).toEqual(31);
            expect(NbJours.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => NbJours.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => NbJours.of(PositiveInteger.of(32))).toThrow(InvalidNbJoursError);
        });
    });

    describe('toString', () => {
        it('should return the number of days as a string', () => {
            expect(NbJours.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(NbJours.of(PositiveInteger.of(31)).toString()).toEqual('31');
            expect(NbJours.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
