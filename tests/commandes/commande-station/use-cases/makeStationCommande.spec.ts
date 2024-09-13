import {
    createInMemoryCommandeStationAPIMaker,
    createSuccessfulAPIResponse,
} from '@/commandes/commande-station/api/adapters/in-memory/makeCommandeStation.js';
import { CommandeStationData } from '@/commandes/commande-station/api/CommandeStationData.js';
import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { InMemoryCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/in-memory/InMemoryCommandesStationsRepository.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeStationCommande } from '@/commandes/commande-station/use-cases/makeStationCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { describe, expect, it } from 'vitest';

describe('makeStationCommande', () => {
    it('should make a station commande', async () => {
        const repository = InMemoryCommandesStationsRepository.of([]);
        await makeStationCommande({
            frequence: DataFrequency.of('quotidienne'),
            idStation: IdStation.of('76116001'),
            periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
            commandeStationApiMaker: createInMemoryCommandeStationAPIMaker({
                quotidienne: {
                    '76116001': createSuccessfulAPIResponse<CommandeStationData>({
                        elaboreProduitAvecDemandeResponse: { return: '779660013384' },
                    }),
                },
            }),
            commandesStationsRepository: repository,
        });
        const commandes = await repository.selectAll();
        expect(commandes).toEqual([
            CommandeStation.of({
                id: '779660013384',
                frequence: 'quotidienne',
                idStation: '76116001',
                status: 'pending',
                dateDebPeriode: new Date('2000-06-15T12:00:00Z'),
                dateFinPeriode: new Date('2000-06-15T12:00:00Z'),
            }),
        ]);
    });
});
