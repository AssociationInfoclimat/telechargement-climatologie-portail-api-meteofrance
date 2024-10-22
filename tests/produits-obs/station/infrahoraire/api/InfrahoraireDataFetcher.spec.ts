import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';
import {
    createInMemoryInfrahoraireDataAPIFetcher,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/produits-obs/station/infrahoraire/api/adapters/fetchInfrahoraireData.in-memory.js';
import { InfrahoraireDataFetcher } from '@/produits-obs/station/infrahoraire/api/InfrahoraireDataFetcher.js';
import { createInfrahoraireDate } from '@/produits-obs/station/infrahoraire/createInfrahoraireDate.js';
import { describe, expect, it } from 'vitest';

describe('InfrahoraireDataFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new InfrahoraireDataFetcher({
                fetchInfrahoraireDataAPI: createInMemoryInfrahoraireDataAPIFetcher({
                    '76116001': createServerErrorAPIResponse(),
                }),
                waitingTimeInMs: 0,
            });
            await expect(() =>
                fetcher.fetchInfrahoraireData({
                    idStation: IdStation.of('76116001'),
                    infrahoraireDate: createInfrahoraireDate({ year: 2024, month: 10, day: 16, hour: 12, minute: 6 }),
                })
            ).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new InfrahoraireDataFetcher({
                fetchInfrahoraireDataAPI: createInMemoryInfrahoraireDataAPIFetcher({
                    '76116001': { code: 429, message: '', data: null },
                }),
            });
            await expect(() =>
                fetcher.fetchInfrahoraireData({
                    idStation: IdStation.of('76116001'),
                    infrahoraireDate: createInfrahoraireDate({ year: 2024, month: 10, day: 16, hour: 12, minute: 6 }),
                })
            ).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new InfrahoraireDataFetcher({
                fetchInfrahoraireDataAPI: createInMemoryInfrahoraireDataAPIFetcher({
                    '76116001': createSuccessfulAPIResponse([{ key: 'value' }]),
                }),
            });
            await expect(() =>
                fetcher.fetchInfrahoraireData({
                    idStation: IdStation.of('76116001'),
                    infrahoraireDate: createInfrahoraireDate({ year: 2024, month: 10, day: 16, hour: 12, minute: 6 }),
                })
            ).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the data', async () => {
            const data = {
                lat: 49.3895,
                lon: 1.178333,
                geo_id_insee: '76116001',
                reference_time: '2024-10-16T12:12:05Z',
                insert_time: '2024-10-16T12:09:26Z',
                validity_time: '2024-10-16T12:06:00Z',
                t: 295.95,
                td: 289.05,
                u: 65,
                dd: 160,
                ff: 7.5,
                dxi10: 160,
                fxi10: 11.1,
                rr_per: 0.0,
                t_10: 286.95,
                t_20: 286.95,
                t_50: 286.75,
                t_100: 287.15,
                vv: 31510,
                etat_sol: null,
                sss: 0.0,
                insolh: 5.0,
                ray_glo01: 166300.0,
                pres: 98580,
                pmer: 100370,
            };
            const fetcher = new InfrahoraireDataFetcher({
                fetchInfrahoraireDataAPI: createInMemoryInfrahoraireDataAPIFetcher({
                    '76116001': createSuccessfulAPIResponse([data]),
                }),
            });
            const fetched = await fetcher.fetchInfrahoraireData({
                idStation: IdStation.of('76116001'),
                infrahoraireDate: createInfrahoraireDate({ year: 2024, month: 10, day: 16, hour: 12, minute: 6 }),
            });
            expect(fetched).toEqual({
                lat: 49.3895,
                lon: 1.178333,
                geo_id_insee: IdStation.of('76116001'),
                reference_time: new Date('2024-10-16T12:12:05Z'),
                insert_time: new Date('2024-10-16T12:09:26Z'),
                validity_time: new Date('2024-10-16T12:06:00Z'),
                t: 22.8,
                td: 15.9,
                u: HumiditeRelative.of(65),
                dd: WindDirection.of(PositiveInteger.of(160)),
                ff: PositiveFloat.of(7.5),
                dxi10: WindDirection.of(PositiveInteger.of(160)),
                fxi10: PositiveFloat.of(11.1),
                rr_per: PositiveFloat.of(0.0),
                t_10: 13.8,
                t_20: 13.8,
                t_50: 13.6,
                t_100: 14,
                vv: PositiveInteger.of(31510),
                etat_sol: Etat.of(PositiveInteger.of(null)),
                sss: PositiveFloat.of(0.0),
                n: Percentage.of(PositiveInteger.of(null)),
                insolh: PositiveFloat.of(5.0),
                ray_glo01: PositiveFloat.of(166300.0),
                pres: PositiveFloat.of(985.8),
                pmer: PositiveFloat.of(1003.7),
            });
        });
    });
});
