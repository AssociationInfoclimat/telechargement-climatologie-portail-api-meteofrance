import { InformationsStations } from '@/stations/information-station/InformationStation.js';

export interface InformationsStationsRepository {
    upsert(informationsStations: InformationsStations): Promise<void>;

    selectAll(): Promise<InformationsStations>;
}
