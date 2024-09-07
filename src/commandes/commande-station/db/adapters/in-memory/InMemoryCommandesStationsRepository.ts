import { CommandeStation, CommandeStationDTO } from '@/commandes/commande-station/CommandeStation.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';

export class InMemoryCommandesStationsRepository implements CommandesStationsRepository {
    private readonly commandes: CommandeStation[];

    private constructor(commandes: CommandeStation[]) {
        this.commandes = commandes;
    }

    static of(dtos: CommandeStationDTO[] = []): InMemoryCommandesStationsRepository {
        return new InMemoryCommandesStationsRepository(dtos.map(CommandeStation.of));
    }

    async insert(commande: CommandeStation): Promise<void> {
        this.commandes.push(commande);
    }

    selectAll(): Promise<CommandeStation[]> {
        return Promise.resolve(this.commandes);
    }
}
