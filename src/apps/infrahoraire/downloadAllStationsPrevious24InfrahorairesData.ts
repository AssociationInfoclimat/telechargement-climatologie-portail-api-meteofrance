import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchListeStations } from '@/paquet-obs/liste-stations/api/adapters/fetchListeStations.meteo-france.js';
import { PrismaListeStationsRepository } from '@/paquet-obs/liste-stations/db/adapters/ListeStationsRepository.prisma.js';
import { fetchInfrahoraireData } from '@/paquet-obs/paquet/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { downloadAllStationsPrevious24InfrahorairesData } from '@/paquet-obs/paquet/infrahoraire/use-cases/downloadAllStationsPrevious24InfrahorairesData.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    await downloadAllStationsPrevious24InfrahorairesData({
        listeStationsAPIFetcher: fetchListeStations,
        listeStationsRepository: new PrismaListeStationsRepository(prisma),
        infrahoraireDataAPIFetcher: fetchInfrahoraireData,
        infrahoraireRepository: new PrismaInfrahoraireRepository(prisma),
    });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
