import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('IdStation', () => {
    it("should accept correctly formatted 'DDCCCNNN' station id", () => {
        expect(IdStation.of('76116001').value()).toBe('76116001');
        expect(IdStation.of(76116001).value()).toBe('76116001');
        expect(IdStation.of('01014002').value()).toBe('01014002');
        expect(IdStation.of(1014002).value()).toBe('01014002');
    });
    it('should not accept incorrectly formatted station id', () => {
        expect(() => IdStation.of('761160010')).toThrow();
        expect(() => IdStation.of('7611600')).toThrow();
        expect(() => IdStation.of('761160010')).toThrow();
        expect(() => IdStation.of('7611600')).toThrow();
    });
});
