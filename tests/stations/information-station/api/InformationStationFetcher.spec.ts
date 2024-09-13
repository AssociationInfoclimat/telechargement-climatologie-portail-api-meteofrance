import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import {
    createInMemoryInformationStationAPIFetcher,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/stations/information-station/api/adapters/in-memory/fetchInformationStation.js';
import {
    InformationStationFetcher,
    MissingInformationsError,
} from '@/stations/information-station/api/InformationStationFetcher.js';
import { describe, expect, it } from 'vitest';

describe('InformationStationFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher({
                    '76116001': createServerErrorAPIResponse(),
                }),
                waitingTimeInMs: 0,
            });
            await expect(() => fetcher.fetchInformationStation(IdStation.of('76116001'))).rejects.toThrow(
                TooManyRetriesError
            );
        });
    });
    describe('when missing informations', () => {
        it('should throw missing informations error', async () => {
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher(),
            });
            await expect(() => fetcher.fetchInformationStation(IdStation.of('05077403'))).rejects.toThrow(
                MissingInformationsError
            );
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher({
                    '76116001': { code: 429, message: '', data: null },
                }),
            });
            await expect(() => fetcher.fetchInformationStation(IdStation.of('76116001'))).rejects.toThrow(
                UnexpectedResponseError
            );
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher({
                    '76116001': createSuccessfulAPIResponse([{ key: 'value' }]),
                }),
            });
            await expect(() => fetcher.fetchInformationStation(IdStation.of('76116001'))).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the data', async () => {
            const data = [
                {
                    id: 76116001,
                    nom: 'BOOS (ROUEN-BOOS)',
                    lieuDit: 'AEROD.ROUEN BOOS',
                    bassin: 'H326',
                    dateDebut: '1968-03-01 00:00:00',
                    dateFin: '',
                    typesPoste: [
                        {
                            type: 0,
                            dateDebut: '1968-03-01 00:00:00',
                            dateFin: '',
                        },
                    ],
                    parametres: [
                        {
                            nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                            dateDebut: '1968-03-01 00:00:00',
                            dateFin: '',
                        },
                        {
                            nom: 'BASE DE LA 1ERE COUCHE NUAGEUSE',
                            dateDebut: '1987-01-01 00:00:00',
                            dateFin: '',
                        },
                    ],
                    producteurs: [
                        {
                            nom: 'METEO-FRANCE',
                            dateDebut: '1968-03-01 00:00:00',
                            dateFin: '',
                        },
                    ],
                    positions: [
                        {
                            altitude: 151,
                            latitude: 49.383,
                            longitude: 1.1816666666666666,
                            dateDebut: '1968-03-01 00:00:00',
                            dateFin: '2022-01-03 00:00:00',
                        },
                        {
                            altitude: 156,
                            latitude: 49.3895,
                            longitude: 1.1783333333333332,
                            dateDebut: '2022-01-04 00:00:00',
                            dateFin: '',
                        },
                    ],
                },
            ];
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher({
                    '76116001': createSuccessfulAPIResponse(data),
                }),
            });
            const fetched = await fetcher.fetchInformationStation(IdStation.of('76116001'));
            expect(fetched).toEqual(data);
        });
    });
});
