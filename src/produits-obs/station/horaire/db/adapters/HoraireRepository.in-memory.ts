import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { HoraireLineDTO } from '@/produits-obs/station/horaire/HoraireLineDTO.js';

export class InMemoryHoraireRepository implements HoraireRepository {
    private lines: HoraireLineDTO[];

    constructor(lines: HoraireLineDTO[] = []) {
        this.lines = lines;
    }

    async upsert(line: HoraireLineDTO): Promise<void> {
        await this.upsertMany([line]);
    }

    async upsertMany(lines: HoraireLineDTO[]): Promise<void> {
        const previousLines = this.lines;
        const newLines: HoraireLineDTO[] = [...previousLines];
        for (const line of lines) {
            const index = previousLines.findIndex(
                s => s.geo_id_insee === line.geo_id_insee && s.validity_time === line.validity_time
            );
            if (index !== -1) {
                newLines[index] = line;
            } else {
                newLines.push(line);
            }
        }
        this.lines = newLines;
    }

    selectAll(): Promise<HoraireLineDTO[]> {
        return Promise.resolve(this.lines);
    }
}
