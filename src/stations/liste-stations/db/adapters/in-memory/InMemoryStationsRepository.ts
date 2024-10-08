import { IdStation } from '@/id-station/IdStation.js';
import { InMemoryInformationsStationsRepository } from '@/stations/information-station/db/adapters/in-memory/InMemoryInformationsStationsRepository.js';
import { InformationStationDTO } from '@/stations/information-station/InformationStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';

export class InMemoryStationsRepository implements StationsRepository {
    private stations: Stations;
    private readonly informationsStationsRepository: InMemoryInformationsStationsRepository;

    private constructor({
        stations,
        informationsStationsRepository,
    }: {
        stations: Stations;
        informationsStationsRepository: InMemoryInformationsStationsRepository;
    }) {
        this.stations = stations;
        this.informationsStationsRepository = informationsStationsRepository;
    }

    static of(dtos: StationDTO[] = []): InMemoryStationsRepository {
        return new InMemoryStationsRepository({
            stations: Stations.of(dtos),
            informationsStationsRepository: InMemoryInformationsStationsRepository.of([]),
        });
    }

    static withInformations(
        dtos: StationDTO[] = [],
        { informationsDTO = [] }: { informationsDTO?: InformationStationDTO[] } = {}
    ): InMemoryStationsRepository {
        return new InMemoryStationsRepository({
            stations: Stations.of(dtos),
            informationsStationsRepository: InMemoryInformationsStationsRepository.of(informationsDTO),
        });
    }

    static withInformationsRepository(
        dtos: StationDTO[] = [],
        { informationsStationsRepository }: { informationsStationsRepository: InMemoryInformationsStationsRepository }
    ): InMemoryStationsRepository {
        return new InMemoryStationsRepository({
            stations: Stations.of(dtos),
            informationsStationsRepository,
        });
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

    async selectAllIds(): Promise<IdStation[]> {
        const stations = await this.selectAll();
        return new Array(...new Set(stations.get().map(station => station.id.value()))).map(id => IdStation.of(id));
    }

    async selectIdsWithNoInformations(): Promise<IdStation[]> {
        const ids = await this.selectAllIds();
        const informations = await this.informationsStationsRepository.selectAll();
        const informationsIds = informations.toDTOs().map(information => information.id);
        return ids.filter(id => !informationsIds.includes(id.value()));
    }

    selectIdsForFrequency(frequence: DataFrequency): Promise<IdStation[]> {
        const ids = this.stations
            .get()
            .filter(station => station.frequence.value() === frequence.value())
            .map(station => station.id);
        return Promise.resolve(ids);
    }

    selectHoraireIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('horaire'));
    }

    selectInfrahoraire6mIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('infrahoraire-6m'));
    }

    selectQuotidienneIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('quotidienne'));
    }
}
