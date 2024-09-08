import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { CommandeStationStatus } from '@/commandes/commande-station/CommandeStationStatus.js';
import { IdCommande } from '@/IdCommande.js';

export interface CommandeStationStatusUpdate {
    id: IdCommande;
    status: CommandeStationStatus;
}

export interface CommandesStationsRepository {
    insert(commande: CommandeStation): Promise<void>;

    updateStatus(update: CommandeStationStatusUpdate): Promise<void>;

    selectAll(): Promise<CommandeStation[]>;
}
