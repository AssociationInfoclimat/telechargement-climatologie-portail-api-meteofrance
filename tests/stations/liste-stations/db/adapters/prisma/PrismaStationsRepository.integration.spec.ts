import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('PrismaStationsRepository', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
    });
    beforeEach(async () => {
        await prisma.station.deleteMany();
    });
    it('should upsert stations in the database', async () => {
        const stationsToInsert: Stations = Stations.of([
            {
                id: '76116001',
                nom: 'ROUEN-BOOS',
                departement: 76,
                frequences: ['infrahoraire-6m'],
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
                frequences: ['infrahoraire-6m'],
                posteOuvert: true,
                typePoste: 1,
                lon: 1.5025,
                lat: 49.733167,
                alt: 232,
                postePublic: true,
            },
        ]);
        const repository = new PrismaStationsRepository(prisma);
        await repository.upsertMany(stationsToInsert);
        const insertedStations = await repository.selectAll();
        expect(insertedStations).toEqual(stationsToInsert);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
