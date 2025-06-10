import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchHoraireData } from '@/paquet-obs/paquet/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { downloadDepartementPrevious24HorairesData } from '@/paquet-obs/paquet/horaire/use-cases/downloadDepartementPrevious24HorairesData.js';
import { PrismaHoraireRepository } from '@/produits-obs/station/horaire/db/adapters/HoraireRepository.prisma.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading previous 24 horaires data in departement...' });
    await downloadDepartementPrevious24HorairesData({
        departement: Departement.of(974),
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
