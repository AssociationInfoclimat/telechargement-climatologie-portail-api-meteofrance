import {
    createFetchListeStationsFrequency,
    ListeStationsFrequencyFetcher,
} from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export const fetchListeStationsHoraire = createFetchListeStationsFrequency(DataFrequency.of('horaire'));

export class ListeStationsHoraireFetcher extends ListeStationsFrequencyFetcher {
    constructor() {
        super({ listeStationsFetcher: fetchListeStationsHoraire });
    }

    async fetchListeStationsHoraire(
        departement: Departement,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<ListeStationsData> {
        return this.fetchListeStationsFrequency(departement, { retries });
    }
}
