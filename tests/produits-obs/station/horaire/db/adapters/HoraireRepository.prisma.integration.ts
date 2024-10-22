import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { HoraireLineDTO } from '@/produits-obs/station/horaire/HoraireLineDTO.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, assert, beforeEach, describe, it } from 'vitest';

describe('PrismaHoraireRepository', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.horaireTempsReel.deleteMany();
    });
    describe('upsertMany', () => {
        it('should upsert stations in the database', async () => {
            const dataToInsert: HoraireLineDTO[] = [
                {
                    lat: 49.3895,
                    lon: 1.178333,
                    geo_id_insee: '76116001',
                    reference_time: new Date('2024-10-16T12:10:06Z'),
                    insert_time: new Date('2024-10-16T12:03:26Z'),
                    validity_time: new Date('2024-10-16T12:00:00Z'),
                    t: 22.8,
                    td: 16.1,
                    tx: 22.8,
                    tn: 20.9,
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
                    t_10: 13.8,
                    t_20: 13.8,
                    t_50: 13.6,
                    t_100: 14,
                    vv: 32770,
                    etat_sol: null,
                    sss: 0,
                    n: null,
                    insolh: 48,
                    ray_glo01: 1595000,
                    pres: 986.0,
                    pmer: 1003.9,
                },
            ];
            const repository = new PrismaHoraireRepository(prisma);
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
