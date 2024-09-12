import { IdStation } from '@/id-station/IdStation.js';
import { Stations } from '@/stations/liste-stations/Station.js';

export interface StationsRepository {
    upsertMany(stations: Stations): Promise<void>;

    selectAll(): Promise<Stations>;

    selectAllIds(): Promise<IdStation[]>;

    selectIdsWithNoInformations(): Promise<IdStation[]>;
}
