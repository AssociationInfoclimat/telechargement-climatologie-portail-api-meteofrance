import { InfrahoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDataFetcher } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/InfrahoraireDataFetcher.js';
import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';
import { toDTO } from '@/produits-obs/station/infrahoraire/json/toDTO.js';

export async function downloadAllInfrahorairesDataAt({
    infrahoraireDate,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
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
    const data = await fetcher.fetchInfrahoraireData(infrahoraireDate);
    await repository.upsertMany(data.map(toDTO));
}
