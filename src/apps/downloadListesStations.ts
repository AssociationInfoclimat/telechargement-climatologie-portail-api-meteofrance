import { createListeStationsAPIFetcher } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { downloadListesStations } from '@/stations/liste-stations/use-cases/downloadListesStations.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    const prisma = new PrismaClient();
    console.log('Downloading stations...');
    await downloadListesStations({
        stationsRepository: new PrismaStationsRepository(prisma),
        listeStationsAPIFetcher: createListeStationsAPIFetcher(),
        retries: 10,
    });
    console.log('Done');
}

try {
    await main();
} catch (e) {
    console.error(e);
}
