import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('PositiveInteger', () => {
    describe('of', () => {
        it('should accept 0, positive integer, or null', () => {
            expect(PositiveInteger.of(0).value()).toEqual(0);
            expect(PositiveInteger.of(1).value()).toEqual(1);
            expect(PositiveInteger.of(null).value()).toBeNull();
        });

        it('should not accept negative numbers or floats', () => {
            expect(() => PositiveInteger.of(-1).value()).toThrow(InvalidPositiveIntegerError);
            expect(() => PositiveInteger.of(1.1).value()).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('toString', () => {
        it('should return the number as a string', () => {
            expect(PositiveInteger.of(0).toString()).toEqual('0');
            expect(PositiveInteger.of(1).toString()).toEqual('1');
            expect(PositiveInteger.of(null).toString()).toEqual('');
        });
    });
});
