import { fetchHoraireData } from '@/paquet-stations-obs/paquet/stations/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { downloadAllLastHorairesData } from '@/paquet-stations-obs/paquet/stations/horaire/use-cases/downloadAllLastHorairesData.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadAllLastHorairesData', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.horaireTempsReel.deleteMany();
    });
    it('should download the last horaire data from all stations', async () => {
        const repository = new PrismaHoraireRepository(prisma);
        await downloadAllLastHorairesData({
            now: new Date(),
            apiFetcher: fetchHoraireData,
            repository,
        });
        const data = await repository.selectAll();
        expect(data).not.toHaveLength(0);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
