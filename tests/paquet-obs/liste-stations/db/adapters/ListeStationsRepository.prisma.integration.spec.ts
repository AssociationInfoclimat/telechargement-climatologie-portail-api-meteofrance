import { PrismaListeStationsRepository } from '@/paquet-obs/liste-stations/db/adapters/ListeStationsRepository.prisma.js';
import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, assert, beforeEach, describe, it } from 'vitest';

describe('PrismaListeStationsRepository', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.stationTempsReel.deleteMany();
    });
    describe('upsertMany', () => {
        it('should upsert stations in the database', async () => {
            const dataToInsert: ListeStationLineDTO[] = [
                {
                    Id_station: '01014002',
                    Id_omm: null,
                    Nom_usuel: 'ARBENT',
                    Latitude: 46.278167,
                    Longitude: 5.669,
                    Altitude: 534,
                    Date_ouverture: new Date('2003-10-01T00:00:00Z'),
                    Pack: 'RADOME',
                },
                {
                    Id_station: '01089001',
                    Id_omm: '07482',
                    Nom_usuel: 'AMBERIEU',
                    Latitude: 45.9765,
                    Longitude: 5.329333,
                    Altitude: 250,
                    Date_ouverture: new Date('1934-03-01T00:00:00Z'),
                    Pack: 'RADOME',
                },
            ];
            const repository = new PrismaListeStationsRepository(prisma);
            await repository.upsertMany(dataToInsert);
            await repository.upsertMany(dataToInsert);

            const insertedStations = await repository.selectAll();
            assert.sameDeepMembers(insertedStations, dataToInsert);
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
