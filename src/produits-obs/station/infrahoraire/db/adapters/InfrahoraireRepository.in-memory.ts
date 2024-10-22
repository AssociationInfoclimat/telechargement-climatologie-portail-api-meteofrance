import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { InfrahoraireLineDTO } from '@/produits-obs/station/infrahoraire/InfrahoraireLineDTO.js';

export class InMemoryInfrahoraireRepository implements InfrahoraireRepository {
    private lines: InfrahoraireLineDTO[];

    constructor(lines: InfrahoraireLineDTO[] = []) {
        this.lines = lines;
    }

    async upsert(line: InfrahoraireLineDTO): Promise<void> {
        await this.upsertMany([line]);
    }

    async upsertMany(lines: InfrahoraireLineDTO[]): Promise<void> {
        const previousLines = this.lines;
        const newLines: InfrahoraireLineDTO[] = [...previousLines];
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

    selectAll(): Promise<InfrahoraireLineDTO[]> {
        return Promise.resolve(this.lines);
    }
}
