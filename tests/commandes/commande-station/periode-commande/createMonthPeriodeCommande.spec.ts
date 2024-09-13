import { createMonthPeriodeCommande } from '@/commandes/commande-station/periode-commande/createMonthPeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('createMonthPeriodeCommande', () => {
    it('should create a periode starting at the first hour of the first day of the month and ending at the last hour of the last day of the month', () => {
        expect(createMonthPeriodeCommande({ year: 2000, month: 6 }).value()).toEqual({
            debut: '2000-06-01T00:00:00Z',
            fin: '2000-06-30T23:00:00Z',
        });
        expect(createMonthPeriodeCommande({ year: 2000, month: 7 }).value()).toEqual({
            debut: '2000-07-01T00:00:00Z',
            fin: '2000-07-31T23:00:00Z',
        });
        expect(createMonthPeriodeCommande({ year: 2000, month: 2 }).value()).toEqual({
            debut: '2000-02-01T00:00:00Z',
            fin: '2000-02-29T23:00:00Z',
        });
        expect(createMonthPeriodeCommande({ year: 2002, month: 2 }).value()).toEqual({
            debut: '2002-02-01T00:00:00Z',
            fin: '2002-02-28T23:00:00Z',
        });
    });
});
