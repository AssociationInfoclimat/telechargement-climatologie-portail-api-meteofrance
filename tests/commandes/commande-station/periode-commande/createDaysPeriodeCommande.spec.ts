import { createDaysPeriodeCommande } from '@/commandes/commande-station/periode-commande/createDaysPeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('createDaysPeriodeCommande', () => {
    it('should create a periode starting at the first hour of the start day and ending at the last hour of the end day', () => {
        expect(
            createDaysPeriodeCommande({
                debut: { year: 1999, month: 12, day: 31 },
                fin: { year: 2000, month: 1, day: 1 },
            }).value()
        ).toEqual({
            debut: '1999-12-31T00:00:00Z',
            fin: '2000-01-01T23:00:00Z',
        });
    });
});
