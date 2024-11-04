import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';

export interface ListeStationsRepository {
    upsert(line: ListeStationLineDTO): Promise<void>;

    upsertMany(lines: ListeStationLineDTO[]): Promise<void>;

    selectAll(): Promise<ListeStationLineDTO[]>;
}
