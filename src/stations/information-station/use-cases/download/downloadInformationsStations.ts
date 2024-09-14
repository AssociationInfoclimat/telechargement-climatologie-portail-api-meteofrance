import { IdStation } from '@/id-station/IdStation.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { convertAPIDataToDTO } from '@/stations/information-station/api/convertAPIDataToDTO.js';
import { InformationStationAPIFetcher } from '@/stations/information-station/api/InformationStationAPIFetcher.js';
import {
    InformationStationFetcher,
    MissingInformationsError,
} from '@/stations/information-station/api/InformationStationFetcher.js';
import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import { ZodError } from 'zod';

export async function downloadInformationsStation({
    fetcher,
    informationsStationsRepository,
    stationId,
}: {
    fetcher: InformationStationFetcher;
    informationsStationsRepository: InformationsStationsRepository;
    stationId: IdStation;
}): Promise<void> {
    const informations = await fetcher.fetchInformationStation(stationId);
    await informationsStationsRepository.upsert(InformationsStations.of(convertAPIDataToDTO(informations)));
}

export async function downloadSomeInformationsStations({
    stationsIds,
    informationStationAPIFetcher,
    informationsStationsRepository,
    throttleInMs = 2 * 1000,
    retries = 5,
}: {
    stationsIds: IdStation[];
    informationStationAPIFetcher: InformationStationAPIFetcher;
    informationsStationsRepository: InformationsStationsRepository;
    throttleInMs?: number;
    retries?: number;
}): Promise<void> {
    const fetcher = new InformationStationFetcher({ informationStationAPIFetcher, retries });
    for (const stationId of stationsIds) {
        LoggerSingleton.getSingleton().info({
            message: `Downloading informations of station '${stationId.value()}'...`,
        });
        try {
            await downloadInformationsStation({
                fetcher,
                informationsStationsRepository,
                stationId,
            });
        } catch (e) {
            if (e instanceof MissingInformationsError) {
                LoggerSingleton.getSingleton().warn({ message: e.message, data: e.response });
            } else if (e instanceof ZodError) {
                LoggerSingleton.getSingleton().warn({ message: e.message, data: e });
            } else {
                throw e;
            }
        }
        await wait(throttleInMs);
    }
}
