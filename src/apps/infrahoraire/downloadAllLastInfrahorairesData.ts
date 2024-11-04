import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchInfrahoraireData } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { downloadAllLastInfrahorairesData } from '@/paquet-stations-obs/paquet/stations/infrahoraire/use-cases/downloadAllLastInfrahorairesData.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading all last infrahoraires data...' });
    await downloadAllLastInfrahorairesData({
        now: new Date(),
        apiFetcher: fetchInfrahoraireData,
        repository: new PrismaInfrahoraireRepository(prisma),
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
