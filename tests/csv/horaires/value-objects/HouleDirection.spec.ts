import { HouleDirection, InvalidHouleDirectionError } from '@/csv/horaires/value-objects/HouleDirection.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('HouleDirection', () => {
    describe('of', () => {
        it('should accept between 0 and 360, 999, and null', () => {
            expect(HouleDirection.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(HouleDirection.of(PositiveInteger.of(360)).value()).toEqual(0);
            expect(HouleDirection.of(PositiveInteger.of(999)).value()).toEqual(999);
            expect(HouleDirection.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => HouleDirection.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => HouleDirection.of(PositiveInteger.of(361))).toThrow(InvalidHouleDirectionError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(HouleDirection.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(HouleDirection.of(PositiveInteger.of(360)).toString()).toEqual('0');
            expect(HouleDirection.of(PositiveInteger.of(999)).toString()).toEqual('999');
            expect(HouleDirection.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
