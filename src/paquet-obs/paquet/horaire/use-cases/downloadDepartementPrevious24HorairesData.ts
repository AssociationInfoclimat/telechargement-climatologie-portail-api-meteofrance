import { HoraireDataAPIFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDataFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataFetcher.js';
import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { toDTO } from '@/produits-obs/station/horaire/json/toDTO.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export async function downloadDepartementPrevious24HorairesData({
    departement,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    departement: Departement;
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
    const data = await fetcher.fetchHoraireData(departement);
    await repository.upsertMany(data.map(toDTO));
}
