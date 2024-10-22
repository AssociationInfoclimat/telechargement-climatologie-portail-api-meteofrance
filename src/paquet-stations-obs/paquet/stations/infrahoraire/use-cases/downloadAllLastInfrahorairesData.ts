import { InfrahoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { downloadAllInfrahorairesDataAt } from '@/paquet-stations-obs/paquet/stations/infrahoraire/use-cases/downloadAllInfrahorairesDataAt.js';
import { getLastInfrahoraireDate } from '@/produits-obs/station/infrahoraire/createInfrahoraireDate.js';
import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';

export async function downloadAllLastInfrahorairesData({
    now,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    now: Date;
    apiFetcher: InfrahoraireDataAPIFetcher;
    repository: InfrahoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    await downloadAllInfrahorairesDataAt({
        infrahoraireDate: getLastInfrahoraireDate(now),
        apiFetcher,
        repository,
        retries,
        waitingTimeInMs,
    });
}
