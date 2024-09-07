import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { makeCommandeStationHoraire } from '@/commandes/commande-station/horaire/api/adapters/meteofrance/makeCommandeStationHoraire.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('CommandeStationHoraireMaker', () => {
    it('should make a command of horaire data', async () => {
        const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationHoraire });
        const response = await maker.makeCommandeStation({
            idStation: IdStation.of('76116001'),
            periodeCommande: PeriodeCommande.of({ debut: '2024-06-15T12:00:00Z', fin: '2024-06-16T12:00:00Z' }),
        });
        expect(response).toEqual(expect.any(String));
    });
});
