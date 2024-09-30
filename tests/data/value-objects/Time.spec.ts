import { InvalidTimeError, Time } from '@/data/value-objects/Time.js';
import { describe, expect, it } from 'vitest';

describe('Time', () => {
    describe('of', () => {
        it('should accept between 0, 0000 and 2359, and empty', () => {
            expect(Time.of('0').value()).toEqual('0000');
            expect(Time.of('0000').value()).toEqual('0000');
            expect(Time.of('2359').value()).toEqual('2359');
            expect(Time.of('').value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => Time.of('00000')).toThrow(InvalidTimeError);
            expect(() => Time.of('2400')).toThrow(InvalidTimeError);
            expect(() => Time.of('2360')).toThrow(InvalidTimeError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(Time.of('0').toString()).toEqual('0000');
            expect(Time.of('0000').toString()).toEqual('0000');
            expect(Time.of('2359').toString()).toEqual('2359');
            expect(Time.of('').toString()).toEqual('');
        });
    });
});
