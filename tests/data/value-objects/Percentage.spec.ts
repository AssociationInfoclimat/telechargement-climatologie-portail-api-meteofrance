import { InvalidPercentageError, Percentage } from '@/data/value-objects/Percentage.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('Percentage', () => {
    describe('of', () => {
        it('should accept between 0 and 100, and null', () => {
            expect(Percentage.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(Percentage.of(PositiveInteger.of(100)).value()).toEqual(100);
            expect(Percentage.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => Percentage.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => Percentage.of(PositiveInteger.of(101))).toThrow(InvalidPercentageError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(Percentage.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(Percentage.of(PositiveInteger.of(100)).toString()).toEqual('100');
            expect(Percentage.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
