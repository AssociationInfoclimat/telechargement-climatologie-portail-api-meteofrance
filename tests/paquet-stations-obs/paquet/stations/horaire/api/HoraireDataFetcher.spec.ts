import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';
import {
    createInMemoryHoraireDataAPIFetcher,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/paquet-stations-obs/paquet/stations/horaire/api/adapters/fetchHoraireData.in-memory.js';
import { HoraireDataFetcher } from '@/paquet-stations-obs/paquet/stations/horaire/api/HoraireDataFetcher.js';
import { createHoraireDate } from '@/produits-obs/station/horaire/createHoraireDate.js';
import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';

describe('HoraireDataFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new HoraireDataFetcher({
                fetchHoraireDataAPI: createInMemoryHoraireDataAPIFetcher({
                    '2000-06-15T12:00:00Z': createServerErrorAPIResponse(),
                }),
                waitingTimeInMs: 0,
            });
            await expect(() =>
                fetcher.fetchHoraireData(createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 }))
            ).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new HoraireDataFetcher({
                fetchHoraireDataAPI: createInMemoryHoraireDataAPIFetcher({
                    '2000-06-15T12:00:00Z': { code: 429, message: '', data: null },
                }),
            });
            await expect(() =>
                fetcher.fetchHoraireData(createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 }))
            ).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new HoraireDataFetcher({
                fetchHoraireDataAPI: createInMemoryHoraireDataAPIFetcher({
                    '2000-06-15T12:00:00Z': createSuccessfulAPIResponse([{ key: 'value' }]),
                }),
            });
            await expect(() =>
                fetcher.fetchHoraireData(createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 }))
            ).rejects.toThrow(ZodError);
        });
    });
    describe('when successful', () => {
        it('should return the data', async () => {
            const data = {
                lat: 49.3895,
                lon: 1.178333,
                geo_id_insee: '76116001',
                reference_time: '2024-10-16T12:10:06Z',
                insert_time: '2024-10-16T12:03:26Z',
                validity_time: '2024-10-16T12:00:00Z',
                t: 295.95,
                td: 289.25,
                tx: 295.95,
                tn: 294.05,
                u: 66,
                ux: 72,
                un: 66,
                dd: 150,
                ff: 7.4,
                dxy: 150,
                fxy: 7.4,
                dxi: 160,
                fxi: 11.1,
                rr1: 0.0,
                t_10: 286.95,
                t_20: 286.95,
                t_50: 286.75,
                t_100: 287.15,
                vv: 32770,
                etat_sol: null,
                sss: 0,
                n: null,
                insolh: 48,
                ray_glo01: 1595000,
                pres: 98600,
                pmer: 100390,
            };
            const fetcher = new HoraireDataFetcher({
                fetchHoraireDataAPI: createInMemoryHoraireDataAPIFetcher({
                    '2000-06-15T12:00:00Z': createSuccessfulAPIResponse([data]),
                }),
            });
            const fetched = await fetcher.fetchHoraireData(
                createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 })
            );
            expect(fetched).toEqual([
                {
                    lat: 49.3895,
                    lon: 1.178333,
                    geo_id_insee: IdStation.of('76116001'),
                    reference_time: new Date('2024-10-16T12:10:06Z'),
                    insert_time: new Date('2024-10-16T12:03:26Z'),
                    validity_time: new Date('2024-10-16T12:00:00Z'),
                    t: 22.8,
                    td: 16.1,
                    tx: 22.8,
                    tn: 20.9,
                    u: HumiditeRelative.of(66),
                    ux: HumiditeRelative.of(72),
                    un: HumiditeRelative.of(66),
                    dd: WindDirection.of(PositiveInteger.of(150)),
                    ff: PositiveFloat.of(7.4),
                    dxy: WindDirection.of(PositiveInteger.of(150)),
                    fxy: PositiveFloat.of(7.4),
                    dxi: WindDirection.of(PositiveInteger.of(160)),
                    fxi: PositiveFloat.of(11.1),
                    rr1: PositiveFloat.of(0.0),
                    t_10: 13.8,
                    t_20: 13.8,
                    t_50: 13.6,
                    t_100: 14,
                    vv: PositiveInteger.of(32770),
                    etat_sol: Etat.of(PositiveInteger.of(null)),
                    sss: PositiveFloat.of(0),
                    n: Percentage.of(PositiveInteger.of(null)),
                    insolh: PositiveFloat.of(48),
                    ray_glo01: PositiveFloat.of(1595000),
                    pres: PositiveFloat.of(986.0),
                    pmer: PositiveFloat.of(1003.9),
                },
            ]);
        });
    });
});
