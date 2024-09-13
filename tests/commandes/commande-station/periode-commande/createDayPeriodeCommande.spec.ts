import { createDayPeriodeCommande } from '@/commandes/commande-station/periode-commande/createDayPeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('createDayPeriodeCommande', () => {
    it('should create a periode starting at the first hour of the day and ending at the last hour of the day', () => {
        expect(createDayPeriodeCommande({ year: 2000, month: 6, day: 15 }).value()).toEqual({
            debut: '2000-06-15T00:00:00Z',
            fin: '2000-06-15T23:00:00Z',
        });
    });
});
