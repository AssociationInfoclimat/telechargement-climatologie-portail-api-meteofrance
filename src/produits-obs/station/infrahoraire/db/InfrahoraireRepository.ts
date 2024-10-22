import { InfrahoraireLineDTO } from '@/produits-obs/station/infrahoraire/InfrahoraireLineDTO.js';

export interface InfrahoraireRepository {
    upsert(line: InfrahoraireLineDTO): Promise<void>;

    upsertMany(lines: InfrahoraireLineDTO[]): Promise<void>;

    selectAll(): Promise<InfrahoraireLineDTO[]>;
}
