import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { IdOMM } from '@/id-station/IdOMM.js';
import { IdStation } from '@/id-station/IdStation.js';
import {
    createInMemoryListeStationsAPIFetcher,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/paquet-obs/liste-stations/api/adapters/fetchListeStations.in-memory.js';
import { ListeStationsFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsFetcher.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new ListeStationsFetcher({
                fetchListeStationsAPI: createInMemoryListeStationsAPIFetcher(createServerErrorAPIResponse()),
                waitingTimeInMs: 0,
            });
            await expect(() => fetcher.fetchListeStations()).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new ListeStationsFetcher({
                fetchListeStationsAPI: createInMemoryListeStationsAPIFetcher({ code: 429, message: '', data: null }),
            });
            await expect(() => fetcher.fetchListeStations()).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new ListeStationsFetcher({
                fetchListeStationsAPI: createInMemoryListeStationsAPIFetcher(
                    createSuccessfulAPIResponse([{ key: 'value' }])
                ),
            });
            await expect(() => fetcher.fetchListeStations()).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the data', async () => {
            const data = `Id_station;Id_omm;Nom_usuel;Latitude;Longitude;Altitude;Date_ouverture;Pack
01014002;;ARBENT;46.278167;5.669000;534;2003-10-01;RADOME
01089001;07482;AMBERIEU;45.976500;5.329333;250;1934-03-01;RADOME
`;
            const fetcher = new ListeStationsFetcher({
                fetchListeStationsAPI: createInMemoryListeStationsAPIFetcher(createSuccessfulAPIResponse(data)),
            });
            const fetched = await fetcher.fetchListeStations();
            expect(fetched).toEqual({
                ok: [
                    {
                        Id_station: IdStation.of('01014002'),
                        Id_omm: IdOMM.of(''),
                        Nom_usuel: 'ARBENT',
                        Latitude: 46.278167,
                        Longitude: 5.669,
                        Altitude: 534,
                        Date_ouverture: new Date('2003-10-01T00:00:00Z'),
                        Pack: 'RADOME',
                    },
                    {
                        Id_station: IdStation.of('01089001'),
                        Id_omm: IdOMM.of('07482'),
                        Nom_usuel: 'AMBERIEU',
                        Latitude: 45.9765,
                        Longitude: 5.329333,
                        Altitude: 250,
                        Date_ouverture: new Date('1934-03-01T00:00:00Z'),
                        Pack: 'RADOME',
                    },
                ],
                ko: [],
            });
        });
    });
});
