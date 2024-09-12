import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { InformationsStations, InformationStationDTO } from '@/stations/information-station/InformationStation.js';

export class InMemoryInformationsStationsRepository implements InformationsStationsRepository {
    private informationsStations: InformationsStations;

    private constructor(informationsStations: InformationsStations) {
        this.informationsStations = informationsStations;
    }

    static of(dtos: InformationStationDTO[] = []): InMemoryInformationsStationsRepository {
        return new InMemoryInformationsStationsRepository(InformationsStations.of(dtos));
    }

    async upsert(informationsStations: InformationsStations): Promise<void> {
        const previousInformations = this.informationsStations.toDTOs();
        const newInformations: InformationStationDTO[] = [...previousInformations];
        for (const station of informationsStations.toDTOs()) {
            const index = previousInformations.findIndex(s => s.id === station.id);
            if (index !== -1) {
                newInformations[index] = station;
            } else {
                newInformations.push(station);
            }
        }
        this.informationsStations = InformationsStations.of(newInformations);
    }

    selectAll(): Promise<InformationsStations> {
        return Promise.resolve(this.informationsStations);
    }
}
