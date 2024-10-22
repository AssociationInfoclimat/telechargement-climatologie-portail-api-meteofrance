import {
    createInfrahoraireDate,
    getLastInfrahoraireDate,
} from '@/produits-obs/station/infrahoraire/createInfrahoraireDate.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';
import { describe, expect, it } from 'vitest';

describe('createInfrahoraireDate', () => {
    describe('createInfrahoraireDate', () => {
        it('should create a date with minutes in 0 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54', () => {
            expect(createInfrahoraireDate({ year: 2000, month: 6, day: 15, hour: 12, minute: 36 })).toEqual(
                InfrahoraireDate.of('2000-06-15T12:36:00Z')
            );
        });
    });
    describe('getLastInfrahoraireDate', () => {
        it('should compute the previous infrahoraire date', () => {
            expect(getLastInfrahoraireDate(new Date('2000-06-15T12:30:00Z'))).toEqual(
                InfrahoraireDate.of('2000-06-15T12:24:00Z')
            );
            expect(getLastInfrahoraireDate(new Date('2000-06-15T12:30:45Z'))).toEqual(
                InfrahoraireDate.of('2000-06-15T12:24:00Z')
            );
            expect(getLastInfrahoraireDate(new Date('2000-06-15T12:35:45Z'))).toEqual(
                InfrahoraireDate.of('2000-06-15T12:24:00Z')
            );
        });
    });
});
