import { CommandeStationStatus } from '@/commandes/commande-station/CommandeStationStatus.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export interface CommandeStationDTO {
    id: string;
    frequence: string;
    status: string;
    dateDebPeriode: Date;
    dateFinPeriode: Date;
    idStation: string;
}

export class CommandeStation {
    id: IdCommande;
    frequence: DataFrequency;
    status: CommandeStationStatus;
    periodeCommande: PeriodeCommande;
    idStation: IdStation;

    constructor(
        id: IdCommande,
        frequence: DataFrequency,
        status: CommandeStationStatus,
        periodeCommande: PeriodeCommande,
        idStation: IdStation
    ) {
        this.id = id;
        this.frequence = frequence;
        this.status = status;
        this.periodeCommande = periodeCommande;
        this.idStation = idStation;
    }

    static of(dto: CommandeStationDTO): CommandeStation {
        return new CommandeStation(
            dto.id,
            DataFrequency.of(dto.frequence),
            CommandeStationStatus.of(dto.status),
            PeriodeCommande.from({ debut: dto.dateDebPeriode, fin: dto.dateFinPeriode }),
            IdStation.of(dto.idStation)
        );
    }

    toDTO(): CommandeStationDTO {
        const { debut, fin } = this.periodeCommande.toDate();
        return {
            id: this.id,
            frequence: this.frequence.value(),
            status: this.status.value(),
            dateDebPeriode: debut,
            dateFinPeriode: fin,
            idStation: this.idStation.value(),
        };
    }
}
