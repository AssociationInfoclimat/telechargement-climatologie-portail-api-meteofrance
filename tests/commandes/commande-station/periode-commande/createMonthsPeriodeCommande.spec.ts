import { createMonthsPeriodeCommande } from '@/commandes/commande-station/periode-commande/createMonthsPeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('createMonthsPeriodeCommande', () => {
    it('should create a periode starting at the first hour of the first day of the start month and ending at the last hour of the last day of the end month', () => {
        expect(
            createMonthsPeriodeCommande({
                debut: { year: 1999, month: 5 },
                fin: { year: 2000, month: 6 },
            }).value()
        ).toEqual({
            debut: '1999-05-01T00:00:00Z',
            fin: '2000-06-30T23:00:00Z',
        });
        expect(
            createMonthsPeriodeCommande({
                debut: { year: 1999, month: 6 },
                fin: { year: 2000, month: 7 },
            }).value()
        ).toEqual({
            debut: '1999-06-01T00:00:00Z',
            fin: '2000-07-31T23:00:00Z',
        });
        expect(
            createMonthsPeriodeCommande({
                debut: { year: 1999, month: 1 },
                fin: { year: 2000, month: 2 },
            }).value()
        ).toEqual({
            debut: '1999-01-01T00:00:00Z',
            fin: '2000-02-29T23:00:00Z',
        });
        expect(
            createMonthsPeriodeCommande({
                debut: { year: 2001, month: 1 },
                fin: { year: 2002, month: 2 },
            }).value()
        ).toEqual({
            debut: '2001-01-01T00:00:00Z',
            fin: '2002-02-28T23:00:00Z',
        });
    });
});
