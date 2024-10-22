import { fetchInfrahoraireData } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { downloadAllLastInfrahorairesData } from '@/paquet-stations-obs/paquet/stations/infrahoraire/use-cases/downloadAllLastInfrahorairesData.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadAllLastInfrahorairesData', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.infrahoraireTempsReel.deleteMany();
    });
    it('should download the last infrahoraire data from all stations', async () => {
        const repository = new PrismaInfrahoraireRepository(prisma);
        await downloadAllLastInfrahorairesData({
            now: new Date(),
            apiFetcher: fetchInfrahoraireData,
            repository,
        });
        const data = await repository.selectAll();
        expect(data).not.toHaveLength(0);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
