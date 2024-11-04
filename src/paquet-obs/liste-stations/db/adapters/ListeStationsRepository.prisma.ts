import { ListeStationsRepository } from '@/paquet-obs/liste-stations/db/ListeStationsRepository.js';
import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaListeStationsRepository implements ListeStationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async upsert(line: ListeStationLineDTO): Promise<void> {
        await this.prisma.stationTempsReel.upsert({
            where: { Id_station: line.Id_station },
            create: line,
            update: line,
        });
    }

    async upsertMany(lines: ListeStationLineDTO[]): Promise<void> {
        await Promise.all(lines.map(line => this.upsert(line)));
    }

    selectAll(): Promise<ListeStationLineDTO[]> {
        return this.prisma.stationTempsReel.findMany({
            orderBy: { Id_station: 'asc' },
        });
    }
}
