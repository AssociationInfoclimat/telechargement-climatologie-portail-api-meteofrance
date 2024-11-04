import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchInformationStation } from '@/stations/information-station/api/adapters/meteofrance/fetchInformationStation.js';
import { PrismaInformationsStationsRepository } from '@/stations/information-station/db/adapters/prisma/PrismaInformationsStationsRepository.js';
import { downloadAllInformationsStations } from '@/stations/information-station/use-cases/download/downloadAllInformationsStations.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading all stations informations...' });
    await downloadAllInformationsStations({
        stationsRepository: new PrismaStationsRepository(prisma),
        informationStationAPIFetcher: fetchInformationStation,
        informationsStationsRepository: new PrismaInformationsStationsRepository(prisma),
        retries: 10,
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}