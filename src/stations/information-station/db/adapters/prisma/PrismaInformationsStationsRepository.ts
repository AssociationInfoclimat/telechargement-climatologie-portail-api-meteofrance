import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaInformationsStationsRepository implements InformationsStationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async upsert(informationsStations: InformationsStations): Promise<void> {
        await Promise.all(
            informationsStations.toDTOs().map(async dto => {
                await this.prisma.informationStation.upsert({
                    where: { id: dto.id },
                    create: {
                        id: dto.id,
                        nom: dto.nom,
                        lieuDit: dto.lieuDit,
                        bassin: dto.bassin,
                        dateDebut: dto.dateDebut,
                        dateFin: dto.dateFin,
                        typesPoste: {
                            create: dto.typesPoste,
                        },
                        parametres: {
                            create: dto.parametres,
                        },
                        producteurs: {
                            create: dto.producteurs,
                        },
                        positions: {
                            create: dto.positions,
                        },
                    },
                    update: {
                        id: dto.id,
                        nom: dto.nom,
                        lieuDit: dto.lieuDit,
                        bassin: dto.bassin,
                        dateDebut: dto.dateDebut,
                        dateFin: dto.dateFin,
                        typesPoste: {
                            deleteMany: {},
                            create: dto.typesPoste,
                        },
                        parametres: {
                            deleteMany: {},
                            create: dto.parametres,
                        },
                        producteurs: {
                            deleteMany: {},
                            create: dto.producteurs,
                        },
                        positions: {
                            deleteMany: {},
                            create: dto.positions,
                        },
                    },
                });
            })
        );
    }

    async selectAll(): Promise<InformationsStations> {
        const informationsStations = await this.prisma.informationStation.findMany({
            select: {
                id: true,
                nom: true,
                lieuDit: true,
                bassin: true,
                dateDebut: true,
                dateFin: true,
                typesPoste: {
                    select: {
                        type: true,
                        dateDebut: true,
                        dateFin: true,
                    },
                },
                parametres: {
                    select: {
                        nom: true,
                        dateDebut: true,
                        dateFin: true,
                    },
                },
                producteurs: {
                    select: {
                        nom: true,
                        dateDebut: true,
                        dateFin: true,
                    },
                },
                positions: {
                    select: {
                        altitude: true,
                        latitude: true,
                        longitude: true,
                        dateDebut: true,
                        dateFin: true,
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
        return InformationsStations.of(informationsStations);
    }
}
