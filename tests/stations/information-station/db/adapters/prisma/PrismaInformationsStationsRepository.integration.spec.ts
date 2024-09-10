import { PrismaInformationsStationsRepository } from '@/stations/information-station/db/adapters/prisma/PrismaInformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('PrismaInformationsStationsRepository', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.station.deleteMany();
        const repository = new PrismaStationsRepository(prisma);
        await repository.upsertMany(
            Stations.of([
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
            ])
        );
    });
    beforeEach(async () => {
        await prisma.informationStation.deleteMany();
    });
    it('should insert informations stations in the database', async () => {
        const informationsStationsToInsert: InformationsStations = InformationsStations.of([
            {
                id: '01014002',
                nom: 'ARBENT',
                lieuDit: 'AUX CARROS',
                bassin: 'V251',
                dateDebut: new Date('2003-10-01T00:00:00Z'),
                dateFin: null,
                typesPoste: [
                    {
                        type: 1,
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                parametres: [
                    {
                        nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                        dateDebut: new Date('2004-03-18T00:00:00Z'),
                        dateFin: null,
                    },
                    {
                        nom: 'DUREE DES PRECIPITATIONS HORAIRE',
                        dateDebut: new Date('2004-10-21T00:00:00Z'),
                        dateFin: new Date('2004-10-27T23:00:00Z'),
                    },
                ],
                producteurs: [
                    {
                        nom: 'METEO-FRANCE',
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                positions: [
                    {
                        altitude: 534,
                        latitude: 46.278167,
                        longitude: 5.669,
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
            },
        ]);
        const repository = new PrismaInformationsStationsRepository(prisma);
        await repository.insert(informationsStationsToInsert);
        const insertedInformationsStations = await repository.selectAll();
        expect(insertedInformationsStations).toEqual(informationsStationsToInsert);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
