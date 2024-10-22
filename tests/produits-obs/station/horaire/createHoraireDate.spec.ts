import { createHoraireDate, getLastHoraireDate } from '@/produits-obs/station/horaire/createHoraireDate.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';
import { describe, expect, it } from 'vitest';

describe('createHoraireDate', () => {
    describe('createHoraireDate', () => {
        it('should create a date with no minutes', () => {
            expect(createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 })).toEqual(
                HoraireDate.of('2000-06-15T12:00:00Z')
            );
        });
    });
    describe('getLastHoraireDate', () => {
        it('should return the last horaire date', () => {
            expect(getLastHoraireDate(new Date('2000-06-15T12:00:00Z'))).toEqual(
                HoraireDate.of('2000-06-15T12:00:00Z')
            );
            expect(getLastHoraireDate(new Date('2000-06-15T12:30:45Z'))).toEqual(
                HoraireDate.of('2000-06-15T12:00:00Z')
            );
        });
    });
});
