import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { InformationsStations, InformationStationDTO } from '@/stations/information-station/InformationStation.js';

export class InMemoryInformationsStationsRepository implements InformationsStationsRepository {
    private readonly informationsStations: InformationsStations;

    private constructor(informationsStations: InformationsStations) {
        this.informationsStations = informationsStations;
    }

    static of(dtos: InformationStationDTO[] = []): InMemoryInformationsStationsRepository {
        return new InMemoryInformationsStationsRepository(InformationsStations.of(dtos));
    }

    async insert(informationsStations: InformationsStations): Promise<void> {
        this.informationsStations.merge(informationsStations);
    }

    selectAll(): Promise<InformationsStations> {
        return Promise.resolve(this.informationsStations);
    }
}
