import {
    createInMemoryListeStationsAPIFetcher,
    createSuccessfulAPIResponse,
} from '@/stations/liste-stations/api/adapters/in-memory/fetchListeStationsFrequency.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { InMemoryStationsRepository } from '@/stations/liste-stations/db/adapters/in-memory/InMemoryStationsRepository.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import {
    downloadListesStations,
    downloadListeStations,
} from '@/stations/liste-stations/use-cases/downloadListesStations.js';
import { assert, describe, expect, it } from 'vitest';

describe('downloadListesStations', () => {
    describe('downloadListeStations', () => {
        it('should download the list of stations horaire for the departement', async () => {
            const repository = InMemoryStationsRepository.of([]);
            const data: ListeStationsData = [
                {
                    id: '76116001',
                    nom: 'ROUEN-BOOS',
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
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 1.5025,
                    lat: 49.733167,
                    alt: 232,
                    postePublic: true,
                },
            ];
            await downloadListeStations({
                frequence: DataFrequency.of('horaire'),
                departement: Departement.of(76),
                listeStationsFetcher: new ListeStationsFetcher({
                    listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher({
                        horaire: {
                            76: createSuccessfulAPIResponse(data),
                        },
                    }),
                }),
                stationsRepository: repository,
            });
            const stations = await repository.selectAll();
            expect(stations).toEqual(
                Stations.of([
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
                        id: '76130001',
                        nom: 'BOUELLES',
                        departement: 76,
                        frequence: 'horaire',
                        posteOuvert: true,
                        typePoste: 1,
                        lon: 1.5025,
                        lat: 49.733167,
                        alt: 232,
                        postePublic: true,
                    },
                ])
            );
        });
    });

    describe('downloadListesStations', () => {
        it('should download the list of stations horaire for the departement', async () => {
            const repository = InMemoryStationsRepository.of([]);
            await downloadListesStations({
                listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher(
                    {
                        'infrahoraire-6m': {
                            1: createSuccessfulAPIResponse([
                                {
                                    id: '01014002',
                                    nom: 'ARBENT',
                                    posteOuvert: true,
                                    typePoste: 1,
                                    lon: 5.669,
                                    lat: 46.278167,
                                    alt: 534,
                                    postePublic: true,
                                },
                            ]),
                            76: createSuccessfulAPIResponse([
                                {
                                    id: '76116001',
                                    nom: 'ROUEN-BOOS',
                                    posteOuvert: true,
                                    typePoste: 0,
                                    lon: 1.178333,
                                    lat: 49.3895,
                                    alt: 156,
                                    postePublic: true,
                                },
                            ]),
                        },
                        horaire: {
                            1: createSuccessfulAPIResponse([
                                {
                                    id: '01027003',
                                    nom: 'BALAN_AERO',
                                    posteOuvert: true,
                                    typePoste: 2,
                                    lon: 5.106667,
                                    lat: 45.833,
                                    alt: 196,
                                    postePublic: true,
                                },
                            ]),
                            76: createSuccessfulAPIResponse([
                                {
                                    id: '76130001',
                                    nom: 'BOUELLES',
                                    posteOuvert: true,
                                    typePoste: 1,
                                    lon: 1.5025,
                                    lat: 49.733167,
                                    alt: 232,
                                    postePublic: true,
                                },
                            ]),
                        },
                        quotidienne: {
                            1: createSuccessfulAPIResponse([
                                {
                                    id: '01004003',
                                    nom: 'AMBERIEU',
                                    posteOuvert: false,
                                    typePoste: 4,
                                    lon: 5.348333,
                                    lat: 45.955,
                                    alt: 249,
                                    postePublic: true,
                                },
                            ]),
                            76: createSuccessfulAPIResponse([
                                {
                                    id: '76024001',
                                    nom: 'ARDOUVAL',
                                    posteOuvert: false,
                                    typePoste: 4,
                                    lon: 1.273833,
                                    lat: 49.748667,
                                    alt: 180,
                                    postePublic: true,
                                },
                            ]),
                        },
                    },
                    {
                        onMissingDepartementsResponse: createSuccessfulAPIResponse([]),
                        onMissingDepartementResponse: createSuccessfulAPIResponse([]),
                    }
                ),
                stationsRepository: repository,
                throttleInMs: 0,
            });
            const stations = await repository.selectAll();
            assert.sameDeepMembers(stations.toDTOs(), [
                {
                    id: '01014002',
                    nom: 'ARBENT',
                    departement: 1,
                    frequence: 'infrahoraire-6m',
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 5.669,
                    lat: 46.278167,
                    alt: 534,
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
                    id: '01027003',
                    nom: 'BALAN_AERO',
                    departement: 1,
                    frequence: 'horaire',
                    posteOuvert: true,
                    typePoste: 2,
                    lon: 5.106667,
                    lat: 45.833,
                    alt: 196,
                    postePublic: true,
                },
                {
                    id: '76130001',
                    nom: 'BOUELLES',
                    departement: 76,
                    frequence: 'horaire',
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 1.5025,
                    lat: 49.733167,
                    alt: 232,
                    postePublic: true,
                },
                {
                    id: '01004003',
                    nom: 'AMBERIEU',
                    departement: 1,
                    frequence: 'quotidienne',
                    posteOuvert: false,
                    typePoste: 4,
                    lon: 5.348333,
                    lat: 45.955,
                    alt: 249,
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
            ]);
        });
    });
});
