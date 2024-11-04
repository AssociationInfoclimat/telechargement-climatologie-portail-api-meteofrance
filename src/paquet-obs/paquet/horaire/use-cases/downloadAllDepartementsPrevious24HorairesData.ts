import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { HoraireDataAPIFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDataFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataFetcher.js';
import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { toDTO } from '@/produits-obs/station/horaire/json/toDTO.js';
import { getDepartements } from '@/stations/liste-stations/departements/getDepartements.js';

export async function downloadAllDepartementsPrevious24HorairesData({
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs = 2000,
}: {
    apiFetcher: HoraireDataAPIFetcher;
    repository: HoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    LoggerSingleton.getSingleton().info({ message: 'Downloading all departements previous 24 horaires data' });
    const fetcher = new HoraireDataFetcher({
        fetchHoraireDataAPI: apiFetcher,
        retries,
        waitingTimeInMs,
    });
    const departements = getDepartements();
    for (const departement of departements) {
        LoggerSingleton.getSingleton().info({
            message: `Downloading previous 24 horaires data of departement '${departement}'`,
        });
        const data = await fetcher.fetchHoraireData(departement);
        await repository.upsertMany(data.map(toDTO));
        await wait(waitingTimeInMs);
    }
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}
