import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeCommandeStationQuotidienne } from '@/commandes/commande-station/quotidienne/api/adapters/meteofrance/makeCommandeStationQuotidienne.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { describe, expect, it } from 'vitest';

describe('CommandeStationQuotidienneMaker', () => {
    it('should make a command of quotidienne data', async () => {
        const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationQuotidienne });
        const response = await maker.makeCommandeStation({
            frequence: DataFrequency.of('quotidienne'),
            idStation: IdStation.of('76116001'),
            periodeCommande: PeriodeCommande.of({ debut: '2024-06-15T12:00:00Z', fin: '2024-06-16T12:00:00Z' }),
        });
        expect(response).toEqual(expect.any(String));
    });
});
