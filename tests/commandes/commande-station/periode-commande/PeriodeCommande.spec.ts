import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { describe, expect, it } from 'vitest';

describe('PeriodeCommande', () => {
    it('should accept an end further than the start', () => {
        expect(PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T13:00:00Z' }).value()).toEqual({
            debut: '2000-06-15T12:00:00Z',
            fin: '2000-06-15T13:00:00Z',
        });
        expect(
            PeriodeCommande.from({
                debut: new Date('2000-06-15T12:00:00Z'),
                fin: new Date('2000-06-15T13:00:00Z'),
            }).toDate()
        ).toEqual({
            debut: new Date('2000-06-15T12:00:00Z'),
            fin: new Date('2000-06-15T13:00:00Z'),
        });
    });
    it('should not accept an end before the start', () => {
        expect(() => PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T11:00:00Z' })).toThrow();
        expect(() =>
            PeriodeCommande.from({
                debut: new Date('2000-06-15T12:00:00Z'),
                fin: new Date('2000-06-15T11:00:00Z'),
            })
        ).toThrow();
    });
});
