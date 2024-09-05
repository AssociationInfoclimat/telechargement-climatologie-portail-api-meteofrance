import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { CommandeStationQuotidienneMaker } from '@/commandes/commande-station/quotidienne/api/adapters/meteofrance/makeCommandeStationQuotidienne.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('CommandeStationQuotidienneMaker', () => {
    it('should make a command of quotidienne data', async () => {
        try {
            const maker = new CommandeStationQuotidienneMaker();
            const response = await maker.makeCommandeStationQuotidienne({
                idStation: IdStation.of('76116001'),
                periodeCommande: PeriodeCommande.of({ debut: '2024-06-15T12:00:00Z', fin: '2024-06-16T12:00:00Z' }),
            });
            expect(response).toEqual(expect.any(String));
        } catch (e) {
            // console as much information of the error as possible
            console.error(e);
            console.error({ e });
            throw e;
        }
    });
});