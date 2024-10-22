import { HoraireRepository } from '@/produits-obs/station/horaire/db/HoraireRepository.js';
import { HoraireLineDTO } from '@/produits-obs/station/horaire/HoraireLineDTO.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaHoraireRepository implements HoraireRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async upsert(line: HoraireLineDTO): Promise<void> {
        await this.prisma.horaireTempsReel.upsert({
            where: {
                geo_id_insee_validity_time: {
                    geo_id_insee: line.geo_id_insee,
                    validity_time: line.validity_time,
                },
            },
            create: line,
            update: line,
        });
    }

    async upsertMany(lines: HoraireLineDTO[]): Promise<void> {
        await Promise.all(lines.map(line => this.upsert(line)));
    }

    selectAll(): Promise<HoraireLineDTO[]> {
        return this.prisma.horaireTempsReel.findMany({
            orderBy: [{ geo_id_insee: 'asc' }, { validity_time: 'asc' }],
        });
    }
}
