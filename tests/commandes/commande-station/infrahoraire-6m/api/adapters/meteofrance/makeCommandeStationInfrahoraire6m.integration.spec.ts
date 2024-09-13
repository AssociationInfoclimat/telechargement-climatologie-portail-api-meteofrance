import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { makeCommandeStationInfrahoraire6m } from '@/commandes/commande-station/infrahoraire-6m/api/adapters/meteofrance/makeCommandeStationInfrahoraire6m.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { describe, expect, it } from 'vitest';

describe('CommandeStationInfrahoraire6mMaker', () => {
    it('should make a command of infrahoraire 6m data', async () => {
        const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationInfrahoraire6m });
        const response = await maker.makeCommandeStation({
            frequence: DataFrequency.of('infrahoraire-6m'),
            idStation: IdStation.of('76116001'),
            periodeCommande: PeriodeCommande.of({ debut: '2024-06-15T12:00:00Z', fin: '2024-06-15T13:00:00Z' }),
        });
        expect(response).toEqual(expect.any(String));
    });
});
