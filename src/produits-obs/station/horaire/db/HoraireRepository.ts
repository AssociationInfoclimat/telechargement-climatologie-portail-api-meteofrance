import { HoraireLineDTO } from '@/produits-obs/station/horaire/HoraireLineDTO.js';

export interface HoraireRepository {
    upsert(line: HoraireLineDTO): Promise<void>;

    upsertMany(lines: HoraireLineDTO[]): Promise<void>;

    selectAll(): Promise<HoraireLineDTO[]>;
}
