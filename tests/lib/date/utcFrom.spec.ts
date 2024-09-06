import { utcFrom } from '@/lib/date/utcFrom.js';
import { describe, expect, it } from 'vitest';

describe('utcFrom', () => {
    it("should create a UTC date from 'YYYY-MM-DD hh:mm:ss' format", () => {
        expect(utcFrom('2000-06-15 12:30:45')).toEqual(new Date('2000-06-15T12:30:45Z'));
    });
});
