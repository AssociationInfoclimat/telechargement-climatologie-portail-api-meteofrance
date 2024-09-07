import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';

export interface CommandesStationsRepository {
    insert(commande: CommandeStation): Promise<void>;

    selectAll(): Promise<CommandeStation[]>;
}
