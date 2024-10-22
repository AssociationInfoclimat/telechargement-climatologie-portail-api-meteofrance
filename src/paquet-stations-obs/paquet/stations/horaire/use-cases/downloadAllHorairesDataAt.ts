import { HoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDataFetcher } from '@/paquet-stations-obs/paquet/stations/horaire/api/HoraireDataFetcher.js';
import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';
import { toDTO } from '@/produits-obs/station/horaire/json/toDTO.js';

export async function downloadAllHorairesDataAt({
    horaireDate,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    horaireDate: HoraireDate;
    apiFetcher: HoraireDataAPIFetcher;
    repository: HoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const fetcher = new HoraireDataFetcher({
        fetchHoraireDataAPI: apiFetcher,
        retries,
        waitingTimeInMs,
    });
    const data = await fetcher.fetchHoraireData(horaireDate);
    await repository.upsertMany(data.map(toDTO));
}
