import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Stations } from '@/stations/liste-stations/Station.js';

export interface StationsRepository {
    upsertMany(stations: Stations): Promise<void>;

    selectAll(): Promise<Stations>;

    selectAllIds(): Promise<IdStation[]>;

    selectIdsWithNoInformations(): Promise<IdStation[]>;

    selectIdsForFrequency(frequence: DataFrequency): Promise<IdStation[]>;

    selectHoraireIds(): Promise<IdStation[]>;

    selectInfrahoraire6mIds(): Promise<IdStation[]>;

    selectQuotidienneIds(): Promise<IdStation[]>;
}
