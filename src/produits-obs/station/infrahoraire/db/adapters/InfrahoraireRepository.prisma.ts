import { InfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/InfrahoraireRepository.js';
import { InfrahoraireLineDTO } from '@/produits-obs/station/infrahoraire/InfrahoraireLineDTO.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaInfrahoraireRepository implements InfrahoraireRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async upsert(line: InfrahoraireLineDTO): Promise<void> {
        await this.prisma.infrahoraireTempsReel.upsert({
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

    async upsertMany(lines: InfrahoraireLineDTO[]): Promise<void> {
        await Promise.all(lines.map(line => this.upsert(line)));
    }

    selectAll(): Promise<InfrahoraireLineDTO[]> {
        return this.prisma.infrahoraireTempsReel.findMany({
            orderBy: [{ geo_id_insee: 'asc' }, { validity_time: 'asc' }],
        });
    }
}
