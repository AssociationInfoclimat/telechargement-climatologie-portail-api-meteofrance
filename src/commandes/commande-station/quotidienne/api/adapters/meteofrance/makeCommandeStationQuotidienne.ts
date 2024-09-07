import {
    CommandeStationFrequencyMaker,
    createCommandeStationAPIMaker,
} from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStationFrequency.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const makeCommandeStationQuotidienne: CommandeStationAPIMaker = createCommandeStationAPIMaker(
    DataFrequency.of('quotidienne')
);

export class CommandeStationQuotidienneMaker extends CommandeStationFrequencyMaker {
    constructor() {
        super({ commandeStationApiMaker: makeCommandeStationQuotidienne });
    }
}
