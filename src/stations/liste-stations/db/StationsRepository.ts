import { Stations } from '@/stations/liste-stations/Station.js';

export interface StationsRepository {
    insert(stations: Stations): Promise<void>;

    selectAll(): Promise<Stations>;
}
