import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';

export class InMemoryStationsRepository implements StationsRepository {
    private readonly stations: Stations;

    private constructor(stations: Stations) {
        this.stations = stations;
    }

    static of(dtos: StationDTO[] = []): InMemoryStationsRepository {
        return new InMemoryStationsRepository(Stations.of(dtos));
    }

    async upsertMany(stations: Stations): Promise<void> {
        this.stations.merge(stations);
    }

    selectAll(): Promise<Stations> {
        return Promise.resolve(this.stations);
    }
}
