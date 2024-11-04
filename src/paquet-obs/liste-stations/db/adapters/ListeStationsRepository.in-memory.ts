import { ListeStationsRepository } from '@/paquet-obs/liste-stations/db/ListeStationsRepository.js';
import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';

export class InMemoryListeStationsRepository implements ListeStationsRepository {
    private lines: ListeStationLineDTO[];

    constructor(lines: ListeStationLineDTO[] = []) {
        this.lines = lines;
    }

    async upsert(line: ListeStationLineDTO): Promise<void> {
        await this.upsertMany([line]);
    }

    async upsertMany(lines: ListeStationLineDTO[]): Promise<void> {
        const previousLines = this.lines;
        const newLines: ListeStationLineDTO[] = [...previousLines];
        for (const line of lines) {
            const index = previousLines.findIndex(s => s.Id_station === line.Id_station);
            if (index !== -1) {
                newLines[index] = line;
            } else {
                newLines.push(line);
            }
        }
        this.lines = newLines;
    }

    selectAll(): Promise<ListeStationLineDTO[]> {
        return Promise.resolve(this.lines);
    }
}
