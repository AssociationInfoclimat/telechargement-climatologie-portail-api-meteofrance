import {
    CommandeStationFrequencyMaker,
    createCommandeStationAPIMaker,
} from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStationFrequency.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const makeCommandeStationHoraire: CommandeStationAPIMaker = createCommandeStationAPIMaker(
    DataFrequency.of('horaire')
);

export class CommandeStationHoraireMaker extends CommandeStationFrequencyMaker {
    constructor() {
        super({ commandeStationApiMaker: makeCommandeStationHoraire });
    }

    makeCommandeStationHoraire(
        {
            idStation,
            periodeCommande,
        }: {
            idStation: IdStation;
            periodeCommande: PeriodeCommande;
        },
        { retries = 3 }: { retries?: number } = {}
    ): Promise<IdCommande> {
        return this.makeCommandeStationFrequency({ idStation, periodeCommande }, { retries });
    }
}
