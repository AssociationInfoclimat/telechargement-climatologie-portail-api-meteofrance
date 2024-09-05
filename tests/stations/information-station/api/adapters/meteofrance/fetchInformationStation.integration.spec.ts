import { IdStation } from '@/id-station/IdStation.js';
import { InformationStationFetcher } from '@/stations/information-station/api/adapters/meteofrance/fetchInformationStation.js';
import { describe, expect, it } from 'vitest';

describe('InformationStationFetcher', () => {
    it('should fetch station informations', async () => {
        try {
            const fetcher = new InformationStationFetcher();
            const list = await fetcher.fetchInformationStation(IdStation.of('76116001'));
            expect(Array.isArray(list)).toBeTruthy();
            expect(list.length).toBeGreaterThan(0);
            const station = list[0];
            expect(station).toEqual({
                id: expect.any(Number),
                nom: expect.any(String),
                lieuDit: expect.any(String),
                bassin: expect.any(String),
                dateDebut: expect.any(String),
                dateFin: expect.any(String),
                typesPoste: expect.arrayContaining([
                    expect.objectContaining({
                        type: expect.any(Number),
                        dateDebut: expect.any(String),
                        dateFin: expect.any(String),
                    }),
                ]),
                parametres: expect.arrayContaining([
                    expect.objectContaining({
                        nom: expect.any(String),
                        dateDebut: expect.any(String),
                        dateFin: expect.any(String),
                    }),
                ]),
                producteurs: expect.arrayContaining([
                    expect.objectContaining({
                        nom: expect.any(String),
                        dateDebut: expect.any(String),
                        dateFin: expect.any(String),
                    }),
                ]),
                positions: expect.arrayContaining([
                    expect.objectContaining({
                        altitude: expect.any(Number),
                        latitude: expect.any(Number),
                        longitude: expect.any(Number),
                        dateDebut: expect.any(String),
                        dateFin: expect.any(String),
                    }),
                ]),
            });
        } catch (e) {
            // console as much information of the error as possible
            console.error(e);
            console.error({ e });
            throw e;
        }
    });
});
