import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import {
    CommandesStationsRepository,
    CommandeStationStatusUpdate,
} from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import type { PrismaClient } from '@prisma/client';

export class PrismaCommandesStationsRepository implements CommandesStationsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async insert(commande: CommandeStation): Promise<void> {
        const dto = commande.toDTO();
        await this.prisma.commandeStation.create({
            data: {
                id: dto.id,
                status: dto.status,
                dateDebPeriode: dto.dateDebPeriode,
                dateFinPeriode: dto.dateFinPeriode,
                idStation: dto.idStation,
            },
        });
    }

    async updateStatus(update: CommandeStationStatusUpdate): Promise<void> {
        await this.prisma.commandeStation.update({
            data: {
                status: update.status.value(),
            },
            where: {
                id: update.id,
            },
        });
    }

    async selectAll(): Promise<CommandeStation[]> {
        const commandes = await this.prisma.commandeStation.findMany({
            select: {
                id: true,
                status: true,
                dateDebPeriode: true,
                dateFinPeriode: true,
                idStation: true,
            },
        });
        return commandes.map(CommandeStation.of);
    }
}
