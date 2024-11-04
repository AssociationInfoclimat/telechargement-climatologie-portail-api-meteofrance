import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsAPIFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsFetcher.js';
import { ListeStationsRepository } from '@/paquet-obs/liste-stations/db/ListeStationsRepository.js';
import { toDTO as toStationDTO } from '@/paquet-obs/liste-stations/toDTO.js';
import { InfrahoraireDataAPIFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDataFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataFetcher.js';
import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { toDTO as toInfrahoraireDTO } from '@/produits-obs/station/infrahoraire/json/toDTO.js';

export async function downloadAllStationsPrevious24InfrahorairesData({
    listeStationsAPIFetcher,
    listeStationsRepository,
    infrahoraireDataAPIFetcher,
    infrahoraireRepository,
    retries,
    waitingTimeInMs = 2000,
}: {
    listeStationsAPIFetcher: ListeStationsAPIFetcher;
    listeStationsRepository: ListeStationsRepository;
    infrahoraireDataAPIFetcher: InfrahoraireDataAPIFetcher;
    infrahoraireRepository: InfrahoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    LoggerSingleton.getSingleton().info({ message: 'Downloading all stations previous 24 horaires data' });
    const listeStationsFetcher = new ListeStationsFetcher({
        fetchListeStationsAPI: listeStationsAPIFetcher,
        retries,
        waitingTimeInMs,
    });
    const { ok, ko } = await listeStationsFetcher.fetchListeStations();
    await listeStationsRepository.upsertMany(ok.map(toStationDTO));
    ko.forEach(error => LoggerSingleton.getSingleton().warn({ data: error }));

    const infrahoraireFetcher = new InfrahoraireDataFetcher({
        fetchInfrahoraireDataAPI: infrahoraireDataAPIFetcher,
        retries,
        waitingTimeInMs,
    });
    for (const station of ok) {
        LoggerSingleton.getSingleton().info({
            message: `Downloading the last 24h infrahoraires data of station '${station.Id_station}'`,
        });
        const data = await infrahoraireFetcher.fetchInfrahoraireData(station.Id_station);
        await infrahoraireRepository.upsertMany(data.map(toInfrahoraireDTO));
        await wait(waitingTimeInMs);
    }
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}
