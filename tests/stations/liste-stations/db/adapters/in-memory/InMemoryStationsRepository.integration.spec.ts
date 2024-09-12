import { IdStation } from '@/id-station/IdStation.js';
import { InformationStationDTO } from '@/stations/information-station/InformationStation.js';
import { InMemoryStationsRepository } from '@/stations/liste-stations/db/adapters/in-memory/InMemoryStationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';
import { describe, expect, it } from 'vitest';

describe('InMemoryStationsRepository', () => {
    describe('upsertMany', () => {
        it('should upsert stations', async () => {
            const stationsToInsert: Stations = Stations.of([
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
                    frequence: 'infrahoraire-6m',
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 1.5025,
                    lat: 49.733167,
                    alt: 232,
                    postePublic: true,
                },
            ]);
            const repository = InMemoryStationsRepository.of([]);
            await repository.upsertMany(stationsToInsert);
            await repository.upsertMany(stationsToInsert);
            const insertedStations = await repository.selectAll();
            expect(insertedStations).toEqual(stationsToInsert);
        });
    });
    describe('selectIdsWithNoInformations', () => {
        it('should return ids of stations with no informations', async () => {
            const rouenDTO: StationDTO = {
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
            };
            const bouellesDTO: StationDTO = {
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
            };
            const rouenInformationsDTO: InformationStationDTO = {
                id: '76116001',
                nom: 'BOOS (ROUEN-BOOS)',
                lieuDit: 'AEROD.ROUEN BOOS',
                bassin: 'H326',
                dateDebut: new Date('1968-03-01T00:00:00Z'),
                dateFin: null,
                typesPoste: [
                    {
                        type: 0,
                        dateDebut: new Date('1968-03-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                parametres: [
                    {
                        nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                        dateDebut: new Date('1968-03-01T00:00:00Z'),
                        dateFin: null,
                    },
                    {
                        nom: 'BASE DE LA 1ERE COUCHE NUAGEUSE',
                        dateDebut: new Date('1987-01-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                producteurs: [
                    {
                        nom: 'METEO-FRANCE',
                        dateDebut: new Date('1968-03-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                positions: [
                    {
                        altitude: 151,
                        latitude: 49.383,
                        longitude: 1.1816666666666666,
                        dateDebut: new Date('1968-03-01T00:00:00Z'),
                        dateFin: new Date('2022-01-03T00:00:00Z'),
                    },
                    {
                        altitude: 156,
                        latitude: 49.3895,
                        longitude: 1.1783333333333332,
                        dateDebut: new Date('2022-01-04T00:00:00Z'),
                        dateFin: null,
                    },
                ],
            };

            const stationsRepository = InMemoryStationsRepository.withInformations([rouenDTO, bouellesDTO], {
                informationsDTO: [rouenInformationsDTO],
            });
            const ids = await stationsRepository.selectIdsWithNoInformations();
            expect(ids).toEqual([IdStation.of('76130001')]);
        });
    });
});
