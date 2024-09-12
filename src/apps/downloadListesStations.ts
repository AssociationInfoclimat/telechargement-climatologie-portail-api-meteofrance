import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { createListeStationsAPIFetcher } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { downloadListesStations } from '@/stations/liste-stations/use-cases/downloadListesStations.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading stations...' });
    await downloadListesStations({
        stationsRepository: new PrismaStationsRepository(prisma),
        listeStationsAPIFetcher: createListeStationsAPIFetcher(),
        retries: 10,
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
