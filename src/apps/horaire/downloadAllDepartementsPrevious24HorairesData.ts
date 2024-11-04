import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchHoraireData } from '@/paquet-obs/paquet/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { downloadAllDepartementsPrevious24HorairesData } from '@/paquet-obs/paquet/horaire/use-cases/downloadAllDepartementsPrevious24HorairesData.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    await downloadAllDepartementsPrevious24HorairesData({
        apiFetcher: fetchHoraireData,
        repository: new PrismaHoraireRepository(prisma),
    });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
