import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import {
    createInMemoryListeStationsAPIFetcher,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/stations/liste-stations/api/adapters/in-memory/fetchListeStationsFrequency.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new ListeStationsFetcher({
                listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher({
                    quotidienne: {
                        76: createServerErrorAPIResponse(),
                    },
                }),
                waitingTimeInMs: 0,
            });
            await expect(() =>
                fetcher.fetchListeStations({
                    frequence: DataFrequency.of('quotidienne'),
                    departement: Departement.of(76),
                })
            ).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new ListeStationsFetcher({
                listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher(),
            });
            await expect(() =>
                fetcher.fetchListeStations({
                    frequence: DataFrequency.of('quotidienne'),
                    departement: Departement.of(76),
                })
            ).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new ListeStationsFetcher({
                listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher({
                    quotidienne: {
                        76: createSuccessfulAPIResponse([{ key: 'value' }]),
                    },
                }),
            });
            await expect(() =>
                fetcher.fetchListeStations({
                    frequence: DataFrequency.of('quotidienne'),
                    departement: Departement.of(76),
                })
            ).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the data', async () => {
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
            const fetcher = new ListeStationsFetcher({
                listeStationsAPIFetcher: createInMemoryListeStationsAPIFetcher({
                    quotidienne: {
                        76: createSuccessfulAPIResponse(data),
                    },
                }),
            });
            const fetched = await fetcher.fetchListeStations({
                frequence: DataFrequency.of('quotidienne'),
                departement: Departement.of(76),
            });
            expect(fetched).toEqual(data);
        });
    });
});
