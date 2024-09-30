import { Decade, InvalidDecadeError } from '@/data/value-objects/Decade.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('Decade', () => {
    describe('of', () => {
        it('should accept between 1 and 3', () => {
            expect(Decade.of(PositiveInteger.of(1)).value()).toEqual(1);
            expect(Decade.of(PositiveInteger.of(3)).value()).toEqual(3);
        });

        it('should not accept other values', () => {
            expect(() => Decade.of(PositiveInteger.of(0))).toThrow(InvalidDecadeError);
            expect(() => Decade.of(PositiveInteger.of(2.2))).toThrow(InvalidPositiveIntegerError);
            expect(() => Decade.of(PositiveInteger.of(4))).toThrow(InvalidDecadeError);
            expect(() => Decade.of(PositiveInteger.of(null))).toThrow(InvalidDecadeError);
        });
    });

    describe('toString', () => {
        it('should return the decade as a string', () => {
            expect(Decade.of(PositiveInteger.of(1)).toString()).toEqual('1');
            expect(Decade.of(PositiveInteger.of(3)).toString()).toEqual('3');
        });
    });
});
