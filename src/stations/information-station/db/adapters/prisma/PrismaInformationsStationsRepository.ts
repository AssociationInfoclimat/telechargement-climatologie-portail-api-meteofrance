import { InformationsStationsRepository } from '@/stations/information-station/db/InformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaInformationsStationsRepository implements InformationsStationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async insert(informationsStations: InformationsStations): Promise<void> {
        await Promise.all(
            informationsStations.toDTOs().map(async dto => {
                await this.prisma.informationStation.create({
                    data: {
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
        });
        return InformationsStations.of(informationsStations);
    }
}
