import { IdStation } from '@/id-station/IdStation.js';
import { fetchHoraireData } from '@/produits-obs/station/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { createHoraireDate } from '@/produits-obs/station/horaire/createHoraireDate.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { downloadStationHoraireDataAt } from '@/produits-obs/station/horaire/use-cases/downloadStationHoraireDataAt.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadStationHoraireDataAt', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.horaireTempsReel.deleteMany();
    });
    it('should download the horaire data from the station at the horaire date', async () => {
        const repository = new PrismaHoraireRepository(prisma);
        await downloadStationHoraireDataAt({
            idStation: IdStation.of('76116001'),
            horaireDate: createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 }),
            apiFetcher: fetchHoraireData,
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
            tx: expect.nullOrAny(Number),
            tn: expect.nullOrAny(Number),
            u: expect.nullOrAny(Number),
            ux: expect.nullOrAny(Number),
            un: expect.nullOrAny(Number),
            dd: expect.nullOrAny(Number),
            ff: expect.nullOrAny(Number),
            dxy: expect.nullOrAny(Number),
            fxy: expect.nullOrAny(Number),
            dxi: expect.nullOrAny(Number),
            fxi: expect.nullOrAny(Number),
            rr1: expect.nullOrAny(Number),
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
