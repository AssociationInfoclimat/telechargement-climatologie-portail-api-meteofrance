import { CodeSynop, InvalidCodeSynopError } from '@/csv/horaires/value-objects/CodeSynop.js';
import { describe, expect, it } from 'vitest';

describe('CodeSynop', () => {
    describe('of', () => {
        it('should accept /, between 0 and 9, and empty', () => {
            expect(CodeSynop.of('/').value()).toEqual('/');
            expect(CodeSynop.of(0).value()).toEqual(0);
            expect(CodeSynop.of('0').value()).toEqual(0);
            expect(CodeSynop.of(9).value()).toEqual(9);
            expect(CodeSynop.of('9').value()).toEqual(9);
            expect(CodeSynop.of('').value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => CodeSynop.of(-1)).toThrow(InvalidCodeSynopError);
            expect(() => CodeSynop.of('-1')).toThrow(InvalidCodeSynopError);
            expect(() => CodeSynop.of(10)).toThrow(InvalidCodeSynopError);
            expect(() => CodeSynop.of('10')).toThrow(InvalidCodeSynopError);
            expect(() => CodeSynop.of('a')).toThrow(InvalidCodeSynopError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(CodeSynop.of('/').toString()).toEqual('/');
            expect(CodeSynop.of(0).toString()).toEqual('0');
            expect(CodeSynop.of(9).toString()).toEqual('9');
            expect(CodeSynop.of('').toString()).toEqual('');
        });
    });
});
