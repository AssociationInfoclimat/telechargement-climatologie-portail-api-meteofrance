import { createListeStationsAPIFetcher } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { downloadListeStations } from '@/stations/liste-stations/use-cases/downloadListesStations.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadListesStations', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.station.deleteMany();
    });
    it('should download the list of stations horaire for the departement', async () => {
        const repository = new PrismaStationsRepository(prisma);
        await downloadListeStations({
            frequency: DataFrequency.of('horaire'),
            departement: Departement.of(76),
            listeStationsFetcher: new ListeStationsFetcher({
                listeStationsAPIFetcher: createListeStationsAPIFetcher(),
            }),
            stationsRepository: repository,
        });
        const stations = await repository.selectAll();
        expect(stations.get()).not.toHaveLength(0);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
