import { InformationStationAPIFetcher } from '@/stations/information-station/api/InformationStationAPIFetcher.js';
import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { downloadSomeInformationsStations } from '@/stations/information-station/use-cases/download/downloadInformationsStations.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';

export async function downloadAllInformationsStations({
    stationsRepository,
    informationStationAPIFetcher,
    informationsStationsRepository,
    throttleInMs = 2 * 1000,
    retries = 5,
}: {
    stationsRepository: StationsRepository;
    informationStationAPIFetcher: InformationStationAPIFetcher;
    informationsStationsRepository: InformationsStationsRepository;
    throttleInMs?: number;
    retries?: number;
}): Promise<void> {
    const stationsIds = await stationsRepository.selectAllIds();
    await downloadSomeInformationsStations({
        informationStationAPIFetcher,
        retries,
        stationsIds,
        informationsStationsRepository,
        throttleInMs,
    });
}
