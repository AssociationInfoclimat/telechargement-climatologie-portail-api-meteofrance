import { HumiditeRelative, InvalidHumiditeRelativeError } from '@/data/value-objects/HumiditeRelative.js';
import { describe, expect, it } from 'vitest';

describe('HumiditeRelative', () => {
    describe('of', () => {
        it('should accept between 0 and 120, or null', () => {
            expect(HumiditeRelative.of(0).value()).toEqual(0);
            expect(HumiditeRelative.of(120).value()).toEqual(120);
            expect(HumiditeRelative.of(null).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => HumiditeRelative.of(-1)).toThrow(InvalidHumiditeRelativeError);
            expect(() => HumiditeRelative.of(121)).toThrow(InvalidHumiditeRelativeError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(HumiditeRelative.of(0).toString()).toEqual('0');
            expect(HumiditeRelative.of(120).toString()).toEqual('120');
            expect(HumiditeRelative.of(null).toString()).toEqual('');
        });
    });
});
