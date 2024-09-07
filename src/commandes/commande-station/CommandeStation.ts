import { CommandeStationStatus } from '@/commandes/commande-station/CommandeStationStatus.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';

export interface CommandeStationDTO {
    id: string;
    status: string;
    dateDebPeriode: Date;
    dateFinPeriode: Date;
    idStation: string;
}

export class CommandeStation {
    id: IdCommande;
    status: CommandeStationStatus;
    periodeCommande: PeriodeCommande;
    idStation: IdStation;

    constructor(id: IdCommande, status: CommandeStationStatus, periodeCommande: PeriodeCommande, idStation: IdStation) {
        this.id = id;
        this.status = status;
        this.periodeCommande = periodeCommande;
        this.idStation = idStation;
    }

    static of(dto: CommandeStationDTO): CommandeStation {
        return new CommandeStation(
            dto.id,
            CommandeStationStatus.of(dto.status),
            PeriodeCommande.from({ debut: dto.dateDebPeriode, fin: dto.dateFinPeriode }),
            IdStation.of(dto.idStation)
        );
    }

    toDTO(): CommandeStationDTO {
        const { debut, fin } = this.periodeCommande.toDate();
        return {
            id: this.id,
            status: this.status.value(),
            dateDebPeriode: debut,
            dateFinPeriode: fin,
            idStation: this.idStation.value(),
        };
    }
}
