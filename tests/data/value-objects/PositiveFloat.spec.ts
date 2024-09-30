import { InvalidPositiveFloatError, PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { describe, expect, it } from 'vitest';

describe('PositiveFloat', () => {
    describe('of', () => {
        it('should accept 0, positive integer, positive float, or null', () => {
            expect(PositiveFloat.of(0).value()).toEqual(0);
            expect(PositiveFloat.of(1).value()).toEqual(1);
            expect(PositiveFloat.of(1.1).value()).toEqual(1.1);
            expect(PositiveFloat.of(null).value()).toBeNull();
        });

        it('should not accept negative numbers', () => {
            expect(() => PositiveFloat.of(-1).value()).toThrow(InvalidPositiveFloatError);
            expect(() => PositiveFloat.of(-1.1).value()).toThrow(InvalidPositiveFloatError);
        });
    });

    describe('toString', () => {
        it('should return the number as a string', () => {
            expect(PositiveFloat.of(0).toString()).toEqual('0.0');
            expect(PositiveFloat.of(1).toString()).toEqual('1.0');
            expect(PositiveFloat.of(1.1).toString()).toEqual('1.1');
            expect(PositiveFloat.of(null).toString()).toEqual('');
        });
    });
});
