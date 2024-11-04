import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { ListeStationsAPIFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsFetcher.js';
import { ListeStationsRepository } from '@/paquet-obs/liste-stations/db/ListeStationsRepository.js';
import { toDTO } from '@/paquet-obs/liste-stations/toDTO.js';

export async function fetchListeStations({
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    apiFetcher: ListeStationsAPIFetcher;
    repository: ListeStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const fetcher = new ListeStationsFetcher({
        fetchListeStationsAPI: apiFetcher,
        retries,
        waitingTimeInMs,
    });
    const { ok, ko } = await fetcher.fetchListeStations();
    await repository.upsertMany(ok.map(toDTO));
    ko.forEach(error => LoggerSingleton.getSingleton().warn({ data: error }));
}
