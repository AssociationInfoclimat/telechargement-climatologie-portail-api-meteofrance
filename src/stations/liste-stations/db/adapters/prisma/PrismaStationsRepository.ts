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
        const stations = await this.prisma.station.findMany();
        return Stations.of(stations);
    }
}
