import { IdStation } from '@/id-station/IdStation.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaStationsRepository implements StationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async upsertMany(stations: Stations): Promise<void> {
        await Promise.all(
            stations.toDTOs().map(station =>
                this.prisma.station.upsert({
                    where: {
                        id_frequence: {
                            id: station.id,
                            frequence: station.frequence,
                        },
                    },
                    create: station,
                    update: station,
                })
            )
        );
    }

    async selectAll(): Promise<Stations> {
        const stations = await this.prisma.station.findMany({
            orderBy: [{ id: 'asc' }, { frequence: 'asc' }],
        });
        return Stations.of(stations);
    }

    async selectAllIds(): Promise<IdStation[]> {
        const records = await this.prisma.station.findMany({
            select: { id: true },
            distinct: ['id'],
            orderBy: { id: 'asc' },
        });
        return records.map(record => IdStation.of(record.id));
    }
}
