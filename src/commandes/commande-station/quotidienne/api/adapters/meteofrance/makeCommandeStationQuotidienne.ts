import { CommandeStationFrequencyMaker } from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStationFrequency.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export class CommandeStationQuotidienneMaker extends CommandeStationFrequencyMaker {
    constructor() {
        super(DataFrequency.of('quotidienne'));
    }

    makeCommandeStationQuotidienne(
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
