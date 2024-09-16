import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { Prisma, PrismaClient } from '@prisma/client';

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

    async selectIdsWithNoInformations(): Promise<IdStation[]> {
        const records = await this.prisma.$queryRaw<{ id: string }[]>(Prisma.sql`
            SELECT DISTINCT s.id
            FROM "Station" as s
                     LEFT JOIN "InformationStation" as i
                               ON s.id = i.id
            WHERE i.id IS NULL
            ORDER BY s.id ASC
        `);
        return records.map(record => IdStation.of(record.id));
    }

    async selectIdsForFrequency(frequence: DataFrequency): Promise<IdStation[]> {
        const records = await this.prisma.station.findMany({
            select: { id: true },
            distinct: ['id'],
            where: { frequence: frequence.value() },
            orderBy: { id: 'asc' },
        });
        return records.map(record => IdStation.of(record.id));
    }

    async selectHoraireIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('horaire'));
    }

    async selectInfrahoraire6mIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('infrahoraire-6m'));
    }

    async selectQuotidienneIds(): Promise<IdStation[]> {
        return this.selectIdsForFrequency(DataFrequency.of('quotidienne'));
    }
}
