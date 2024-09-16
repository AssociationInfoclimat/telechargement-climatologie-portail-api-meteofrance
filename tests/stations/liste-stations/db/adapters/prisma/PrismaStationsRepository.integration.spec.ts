import { IdStation } from '@/id-station/IdStation.js';
import { PrismaInformationsStationsRepository } from '@/stations/information-station/db/adapters/prisma/PrismaInformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, assert, beforeEach, describe, expect, it } from 'vitest';

describe('PrismaStationsRepository', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.station.deleteMany();
        await prisma.informationStation.deleteMany();
    });
    describe('upsertMany', () => {
        it('should upsert stations in the database', async () => {
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
            const repository = new PrismaStationsRepository(prisma);
            await repository.upsertMany(stationsToInsert);
            await repository.upsertMany(stationsToInsert);

            const insertedStations = await repository.selectAll();
            assert.sameDeepMembers(insertedStations.toDTOs(), stationsToInsert.toDTOs());

            const ids = await repository.selectAllIds();
            assert.sameDeepMembers(ids, [IdStation.of('76116001'), IdStation.of('76130001'), IdStation.of('76024001')]);

            const horaires = await repository.selectHoraireIds();
            assert.sameDeepMembers(horaires, [IdStation.of('76116001')]);

            const infrahoraires = await repository.selectInfrahoraire6mIds();
            assert.sameDeepMembers(infrahoraires, [IdStation.of('76116001'), IdStation.of('76130001')]);

            const quotidiennes = await repository.selectQuotidienneIds();
            assert.sameDeepMembers(quotidiennes, [IdStation.of('76024001')]);
        });
    });
    describe('selectIdsWithNoInformations', () => {
        it('should return ids of stations with no informations', async () => {
            const stationsRepository = new PrismaStationsRepository(prisma);
            await stationsRepository.upsertMany(
                Stations.of([
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
                ])
            );

            const informationsRepository = new PrismaInformationsStationsRepository(prisma);
            await informationsRepository.upsert(
                InformationsStations.of([
                    {
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
                    },
                ])
            );

            const ids = await stationsRepository.selectIdsWithNoInformations();
            expect(ids).toEqual([IdStation.of('76130001')]);
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
