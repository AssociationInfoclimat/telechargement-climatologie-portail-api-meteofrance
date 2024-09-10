import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';

export class InMemoryStationsRepository implements StationsRepository {
    private stations: Stations;

    private constructor(stations: Stations) {
        this.stations = stations;
    }

    static of(dtos: StationDTO[] = []): InMemoryStationsRepository {
        return new InMemoryStationsRepository(Stations.of(dtos));
    }

    async upsertMany(stations: Stations): Promise<void> {
        const previousStations = this.stations.toDTOs();
        const newStations: StationDTO[] = [...previousStations];
        for (const station of stations.toDTOs()) {
            const index = previousStations.findIndex(s => s.id === station.id && s.frequence === station.frequence);
            if (index !== -1) {
                newStations[index] = station;
            } else {
                newStations.push(station);
            }
        }
        this.stations = Stations.of(newStations);
    }

    selectAll(): Promise<Stations> {
        return Promise.resolve(this.stations);
    }
}
