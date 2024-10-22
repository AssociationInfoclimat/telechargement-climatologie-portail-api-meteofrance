import { IdStation } from '@/id-station/IdStation.js';
import { fetchInfrahoraireData } from '@/paquet-obs/paquet/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { downloadStationPrevious24InfrahorairesData } from '@/paquet-obs/paquet/infrahoraire/use-cases/downloadStationPrevious24InfrahorairesData.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadStationPrevious24InfrahorairesData', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.infrahoraireTempsReel.deleteMany();
    });
    it('should download all the infrahoraires data from the station for the last 24 hours', async () => {
        const repository = new PrismaInfrahoraireRepository(prisma);
        await downloadStationPrevious24InfrahorairesData({
            idStation: IdStation.of('76116001'),
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
