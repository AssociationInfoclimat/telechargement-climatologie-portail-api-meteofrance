import { InvalidPositiveNumberError, PositiveNumber } from '@/data/value-objects/PositiveNumber.js';
import { describe, expect, it } from 'vitest';

describe('PositiveNumber', () => {
    describe('of', () => {
        it('should accept 0, positive integer, positive float, or null', () => {
            expect(PositiveNumber.of(0).value()).toEqual(0);
            expect(PositiveNumber.of(1).value()).toEqual(1);
            expect(PositiveNumber.of(1.1).value()).toEqual(1.1);
            expect(PositiveNumber.of(null).value()).toBeNull();
        });

        it('should not accept negative numbers', () => {
            expect(() => PositiveNumber.of(-1).value()).toThrow(InvalidPositiveNumberError);
            expect(() => PositiveNumber.of(-1.1).value()).toThrow(InvalidPositiveNumberError);
        });
    });

    describe('toString', () => {
        it('should return the number as a string', () => {
            expect(PositiveNumber.of(0).toString()).toEqual('0');
            expect(PositiveNumber.of(1).toString()).toEqual('1');
            expect(PositiveNumber.of(1.1).toString()).toEqual('1.1');
            expect(PositiveNumber.of(null).toString()).toEqual('');
        });
    });
});
