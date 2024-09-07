import {
    CommandeStationFrequencyMaker,
    createCommandeStationAPIMaker,
} from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStationFrequency.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const makeCommandeStationInfrahoraire6m: CommandeStationAPIMaker = createCommandeStationAPIMaker(
    DataFrequency.of('infrahoraire-6m')
);

export class CommandeStationInfrahoraire6mMaker extends CommandeStationFrequencyMaker {
    constructor() {
        super({ commandeStationApiMaker: makeCommandeStationInfrahoraire6m });
    }
}
