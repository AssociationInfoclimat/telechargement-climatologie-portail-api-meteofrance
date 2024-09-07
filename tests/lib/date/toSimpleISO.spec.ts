import { toSimpleISO } from '@/lib/date/toSimpleISO.js';
import { describe, expect, it } from 'vitest';

describe('toSimpleISO', () => {
    it("should remove the milliseconds to only keep 'YYYY-MM-DDThh:mm:ssZ'", () => {
        expect(toSimpleISO(new Date('2000-06-15T12:30:45.678Z'))).toEqual('2000-06-15T12:30:45Z');
    });
});
