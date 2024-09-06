import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaStationsRepository implements StationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async insert(stations: Stations): Promise<void> {
        await this.prisma.station.createMany({ data: stations.toDTOs() });
    }

    async selectAll(): Promise<Stations> {
        const stations = await this.prisma.station.findMany();
        return Stations.of(stations);
    }
}
