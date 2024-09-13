import { createYearPeriodeCommande } from '@/commandes/commande-station/periode-commande/createYearPeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('createYearPeriodeCommande', () => {
    it('should create a periode starting at the first hour of the first day of year and ending at the last hour of the last day of the year', () => {
        expect(createYearPeriodeCommande({ year: 2000, month: 6 }).value()).toEqual({
            debut: '2000-01-01T00:00:00Z',
            fin: '2000-12-31T23:00:00Z',
        });
    });
});
