import { HoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/horaire/api/HoraireDataAPIFetcher.js';
import { downloadAllHorairesDataAt } from '@/paquet-stations-obs/paquet/stations/horaire/use-cases/downloadAllHorairesDataAt.js';
import { getLastHoraireDate } from '@/produits-obs/station/horaire/createHoraireDate.js';
import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';

export async function downloadAllLastHorairesData({
    now,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    now: Date;
    apiFetcher: HoraireDataAPIFetcher;
    repository: HoraireRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    await downloadAllHorairesDataAt({
        horaireDate: getLastHoraireDate(now),
        apiFetcher,
        repository,
        retries,
        waitingTimeInMs,
    });
}
