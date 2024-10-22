import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDataAPIFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDataFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataFetcher.js';
import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { toDTO } from '@/produits-obs/station/infrahoraire/json/toDTO.js';

export async function downloadStationPrevious24InfrahorairesData({
    idStation,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    idStation: IdStation;
    apiFetcher: InfrahoraireDataAPIFetcher;
    repository: InfrahoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const fetcher = new InfrahoraireDataFetcher({
        fetchInfrahoraireDataAPI: apiFetcher,
        retries,
        waitingTimeInMs,
    });
    const data = await fetcher.fetchInfrahoraireData(idStation);
    await repository.upsertMany(data.map(toDTO));
}
