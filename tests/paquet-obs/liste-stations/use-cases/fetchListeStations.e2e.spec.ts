import { fetchListeStations as fetchListeStationsAPI } from '@/paquet-obs/liste-stations/api/adapters/fetchListeStations.meteo-france.js';
import { PrismaListeStationsRepository } from '@/paquet-obs/liste-stations/db/adapters/ListeStationsRepository.prisma.js';
import { fetchListeStations } from '@/paquet-obs/liste-stations/use-cases/fetchListeStations.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('fetchListeStations', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.horaireTempsReel.deleteMany();
    });
    it('should download the liste of stations', async () => {
        const repository = new PrismaListeStationsRepository(prisma);
        await fetchListeStations({
            apiFetcher: fetchListeStationsAPI,
            repository,
        });
        const data = await repository.selectAll();
        expect(data).not.toHaveLength(0);
        const sample = data[0];
        expect(sample).toEqual({
            Id_station: expect.any(String),
            Id_omm: expect.nullOrAny(String),
            Nom_usuel: expect.any(String),
            Latitude: expect.any(Number),
            Longitude: expect.any(Number),
            Altitude: expect.any(Number),
            Date_ouverture: expect.any(Date),
            Pack: expect.any(String),
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
