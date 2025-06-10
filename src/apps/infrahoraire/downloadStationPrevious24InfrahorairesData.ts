import { IdStation } from '@/id-station/IdStation.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { fetchInfrahoraireData } from '@/paquet-obs/paquet/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { downloadStationPrevious24InfrahorairesData } from '@/paquet-obs/paquet/infrahoraire/use-cases/downloadStationPrevious24InfrahorairesData.js';
import { PrismaInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.prisma.js';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    const prisma = new PrismaClient();
    LoggerSingleton.getSingleton().info({ message: 'Downloading previous 24 infrahoraires data in station...' });
    await downloadStationPrevious24InfrahorairesData({
        // idStation: IdStation.of('97424410'),
        idStation: IdStation.of('76116001'),
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
