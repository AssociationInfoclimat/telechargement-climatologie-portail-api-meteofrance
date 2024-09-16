import {
    createCorrectSuccessfulAPIResponse,
    createInMemoryCommandeStationAPIMaker,
} from '@/commandes/commande-station/api/adapters/in-memory/makeCommandeStation.js';
import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { InMemoryCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/in-memory/InMemoryCommandesStationsRepository.js';
import { createHoursPeriodeCommande } from '@/commandes/commande-station/periode-commande/createHoursPeriodeCommande.js';
import { makeInfrahoraire6mStationsCommandes } from '@/commandes/commande-station/use-cases/infrahoraire-6m/makeInfrahoraire6mStationsCommandes.js';
import { InMemoryStationsRepository } from '@/stations/liste-stations/db/adapters/in-memory/InMemoryStationsRepository.js';
import { assert, describe, it } from 'vitest';

describe('makeInfrahoraire6mStationsCommandes', () => {
    it('should make commandes for all horaire stations', async () => {
        const commandesStationsRepository = InMemoryCommandesStationsRepository.of([]);
        await makeInfrahoraire6mStationsCommandes({
            stationsRepository: InMemoryStationsRepository.of([
                {
                    id: '76116001',
                    nom: 'ROUEN-BOOS',
                    departement: 76,
                    frequence: 'horaire',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: 1.178333,
                    lat: 49.3895,
                    alt: 156,
                    postePublic: true,
                },
                {
                    id: '76116001',
                    nom: 'ROUEN-BOOS',
                    departement: 76,
                    frequence: 'infrahoraire-6m',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: 1.178333,
                    lat: 49.3895,
                    alt: 156,
                    postePublic: true,
                },
                {
                    id: '76130001',
                    nom: 'BOUELLES',
                    departement: 76,
                    frequence: 'infrahoraire-6m',
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 1.5025,
                    lat: 49.733167,
                    alt: 232,
                    postePublic: true,
                },
                {
                    id: '76024001',
                    nom: 'ARDOUVAL',
                    departement: 76,
                    frequence: 'quotidienne',
                    posteOuvert: false,
                    typePoste: 4,
                    lon: 1.273833,
                    lat: 49.748667,
                    alt: 180,
                    postePublic: true,
                },
            ]),
            periodeCommande: createHoursPeriodeCommande({
                debut: { year: 2000, month: 6, day: 14, hour: 6 },
                fin: { year: 2000, month: 6, day: 15, hour: 18 },
            }),
            commandeStationApiMaker: createInMemoryCommandeStationAPIMaker({
                'infrahoraire-6m': {
                    '76116001': createCorrectSuccessfulAPIResponse('779369825174'),
                    '76130001': createCorrectSuccessfulAPIResponse('779369825175'),
                },
            }),
            commandesStationsRepository: commandesStationsRepository,
        });
        const commandes = await commandesStationsRepository.selectAll();
        assert.sameDeepMembers<CommandeStation>(commandes, [
            CommandeStation.of({
                idStation: '76116001',
                frequence: 'infrahoraire-6m',
                dateDebPeriode: new Date('2000-06-14T06:00:00Z'),
                dateFinPeriode: new Date('2000-06-15T18:00:00Z'),
                status: 'pending',
                id: '779369825174',
            }),
            CommandeStation.of({
                idStation: '76130001',
                frequence: 'infrahoraire-6m',
                dateDebPeriode: new Date('2000-06-14T06:00:00Z'),
                dateFinPeriode: new Date('2000-06-15T18:00:00Z'),
                status: 'pending',
                id: '779369825175',
            }),
        ]);
    });
});
