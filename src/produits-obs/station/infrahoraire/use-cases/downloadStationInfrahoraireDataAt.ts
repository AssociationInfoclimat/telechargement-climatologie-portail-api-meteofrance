import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDataAPIFetcher } from '@/produits-obs/station/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDataFetcher } from '@/produits-obs/station/infrahoraire/api/InfrahoraireDataFetcher.js';
import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';
import { toDTO } from '@/produits-obs/station/infrahoraire/json/toDTO.js';

export async function downloadStationInfrahoraireDataAt({
    idStation,
    infrahoraireDate,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    idStation: IdStation;
    infrahoraireDate: InfrahoraireDate;
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
    const data = await fetcher.fetchInfrahoraireData({ idStation, infrahoraireDate });
    await repository.upsert(toDTO(data));
}
