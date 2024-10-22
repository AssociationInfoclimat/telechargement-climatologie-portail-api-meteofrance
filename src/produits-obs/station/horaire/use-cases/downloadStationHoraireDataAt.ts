import { IdStation } from '@/id-station/IdStation.js';
import { HoraireDataAPIFetcher } from '@/produits-obs/station/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDataFetcher } from '@/produits-obs/station/horaire/api/HoraireDataFetcher.js';
import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';
import { toDTO } from '@/produits-obs/station/horaire/json/toDTO.js';

export async function downloadStationHoraireDataAt({
    idStation,
    horaireDate,
    apiFetcher,
    repository,
    retries,
    waitingTimeInMs,
}: {
    idStation: IdStation;
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
    const data = await fetcher.fetchHoraireData({ idStation, horaireDate });
    await repository.upsert(toDTO(data));
}
