import { InvalidJourError, Jour } from '@/data/value-objects/Jour.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('Jour', () => {
    describe('of', () => {
        it('should accept between 1 and 31, and null', () => {
            expect(Jour.of(PositiveInteger.of(1)).value()).toEqual(1);
            expect(Jour.of(PositiveInteger.of(31)).value()).toEqual(31);
            expect(Jour.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => Jour.of(PositiveInteger.of(0))).toThrow(InvalidJourError);
            expect(() => Jour.of(PositiveInteger.of(32))).toThrow(InvalidJourError);
        });
    });

    describe('toString', () => {
        it('should return the jour as a string', () => {
            expect(Jour.of(PositiveInteger.of(1)).toString()).toEqual('1');
            expect(Jour.of(PositiveInteger.of(31)).toString()).toEqual('31');
            expect(Jour.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
