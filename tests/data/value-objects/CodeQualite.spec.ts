import { CodeQualite, InvalidCodeQualiteError } from '@/data/value-objects/CodeQualite.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('CodeQualite', () => {
    describe('of', () => {
        it('should accept 0, 1, 2 and 9, or null', () => {
            expect(CodeQualite.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(CodeQualite.of(PositiveInteger.of(1)).value()).toEqual(1);
            expect(CodeQualite.of(PositiveInteger.of(2)).value()).toEqual(2);
            expect(CodeQualite.of(PositiveInteger.of(9)).value()).toEqual(9);
            expect(CodeQualite.of(PositiveInteger.of(null)).value()).toBeNull();
        });
        it('should not accept anything else', () => {
            expect(() => CodeQualite.of(PositiveInteger.of(-1)).value()).toThrow(InvalidPositiveIntegerError);
            expect(() => CodeQualite.of(PositiveInteger.of(3)).value()).toThrow(InvalidCodeQualiteError);
            expect(() => CodeQualite.of(PositiveInteger.of(8)).value()).toThrow(InvalidCodeQualiteError);
            expect(() => CodeQualite.of(PositiveInteger.of(10)).value()).toThrow(InvalidCodeQualiteError);
            expect(() => CodeQualite.of(PositiveInteger.of(0.1)).value()).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(CodeQualite.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(CodeQualite.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
