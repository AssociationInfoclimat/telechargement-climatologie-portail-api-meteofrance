import { IdOMM } from '@/id-station/IdOMM.js';
import { describe, expect, it } from 'vitest';

describe('IdOMM', () => {
    it("should accept correctly formatted 'XXXXX' OMM id", () => {
        expect(IdOMM.of('07482').value()).toBe('07482');
        expect(IdOMM.of('').value()).toBeNull();
    });
    it('should not accept incorrectly formatted OMM id', () => {
        expect(() => IdOMM.of('7482')).toThrow();
        expect(() => IdOMM.of('007482')).toThrow();
    });
});
