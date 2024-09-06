import { InformationsStations } from '@/stations/information-station/InformationStation.js';

export interface InformationsStationsRepository {
    insert(informationsStations: InformationsStations): Promise<void>;

    selectAll(): Promise<InformationsStations>;
}
