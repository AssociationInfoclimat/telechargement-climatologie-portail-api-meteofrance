import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchHoraireData } from '@/paquet-stations-obs/paquet/stations/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { downloadAllLastHorairesData } from '@/paquet-stations-obs/paquet/stations/horaire/use-cases/downloadAllLastHorairesData.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading all last horaires data...' });
    await downloadAllLastHorairesData({
        now: new Date(),
        apiFetcher: fetchHoraireData,
        repository: new PrismaHoraireRepository(prisma),
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
