import { IdStation } from '@/id-station/IdStation.js';
import { fetchInfrahoraireData } from '@/produits-obs/station/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { createInfrahoraireDate } from '@/produits-obs/station/infrahoraire/createInfrahoraireDate.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { downloadStationInfrahoraireDataAt } from '@/produits-obs/station/infrahoraire/use-cases/downloadStationInfrahoraireDataAt.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadStationInfrahoraireDataAt', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.infrahoraireTempsReel.deleteMany();
    });
    it('should download the infrahoraire data from the station at the infrahoraire date', async () => {
        const repository = new PrismaInfrahoraireRepository(prisma);
        await downloadStationInfrahoraireDataAt({
            idStation: IdStation.of('76116001'),
            infrahoraireDate: createInfrahoraireDate({ year: 2000, month: 6, day: 15, hour: 12, minute: 36 }),
            apiFetcher: fetchInfrahoraireData,
            repository,
        });
        const data = await repository.selectAll();
        expect(data).not.toHaveLength(0);
        const sample = data[0];
        expect(sample).toEqual({
            geo_id_insee: expect.any(String),
            lat: expect.any(Number),
            lon: expect.any(Number),
            reference_time: expect.any(Date),
            insert_time: expect.any(Date),
            validity_time: expect.any(Date),
            t: expect.nullOrAny(Number),
            td: expect.nullOrAny(Number),
            u: expect.nullOrAny(Number),
            dd: expect.nullOrAny(Number),
            ff: expect.nullOrAny(Number),
            dxi10: expect.nullOrAny(Number),
            fxi10: expect.nullOrAny(Number),
            rr_per: expect.nullOrAny(Number),
            t_10: expect.nullOrAny(Number),
            t_20: expect.nullOrAny(Number),
            t_50: expect.nullOrAny(Number),
            t_100: expect.nullOrAny(Number),
            vv: expect.nullOrAny(Number),
            etat_sol: expect.nullOrAny(Number),
            sss: expect.nullOrAny(Number),
            n: expect.nullOrAny(Number),
            insolh: expect.nullOrAny(Number),
            ray_glo01: expect.nullOrAny(Number),
            pres: expect.nullOrAny(Number),
            pmer: expect.nullOrAny(Number),
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
