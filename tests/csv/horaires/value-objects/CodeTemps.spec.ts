import { CodeTemps, InvalidCodeTempsError } from '@/csv/horaires/value-objects/CodeTemps.js';
import { describe, expect, it } from 'vitest';

describe('CodeTemps', () => {
    describe('of', () => {
        it('should accept between 0, 00 and 99, and empty', () => {
            expect(CodeTemps.of('0').value()).toEqual('00');
            expect(CodeTemps.of('00').value()).toEqual('00');
            expect(CodeTemps.of('99').value()).toEqual('99');
            expect(CodeTemps.of('').value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => CodeTemps.of('000')).toThrow(InvalidCodeTempsError);
            expect(() => CodeTemps.of('100')).toThrow(InvalidCodeTempsError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(CodeTemps.of('0').toString()).toEqual('00');
            expect(CodeTemps.of('00').toString()).toEqual('00');
            expect(CodeTemps.of('99').toString()).toEqual('99');
            expect(CodeTemps.of('').toString()).toEqual('');
        });
    });
});
