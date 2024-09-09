import { Stations } from '@/stations/liste-stations/Station.js';

export interface StationsRepository {
    upsertMany(stations: Stations): Promise<void>;

    selectAll(): Promise<Stations>;
}
