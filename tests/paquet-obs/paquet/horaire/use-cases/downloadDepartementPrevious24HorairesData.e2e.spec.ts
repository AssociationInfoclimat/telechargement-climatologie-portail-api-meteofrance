import { fetchHoraireData } from '@/paquet-obs/paquet/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { downloadDepartementPrevious24HorairesData } from '@/paquet-obs/paquet/horaire/use-cases/downloadDepartementPrevious24HorairesData.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadDepartementPrevious24HorairesData', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.horaireTempsReel.deleteMany();
    });
    it('should download all the horaires data from all stations in the departement for the last 24 hours', async () => {
        const repository = new PrismaHoraireRepository(prisma);
        await downloadDepartementPrevious24HorairesData({
            departement: Departement.of(76),
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
