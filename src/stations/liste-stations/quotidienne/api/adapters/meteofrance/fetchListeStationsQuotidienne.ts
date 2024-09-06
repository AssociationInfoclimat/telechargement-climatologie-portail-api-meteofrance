import {
    createFetchListeStationsFrequency,
    ListeStationsFrequencyFetcher,
} from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export const fetchListeStationsQuotidienne = createFetchListeStationsFrequency(DataFrequency.of('quotidienne'));

export class ListeStationsQuotidienneFetcher extends ListeStationsFrequencyFetcher {
    constructor() {
        super({ listeStationsFetcher: fetchListeStationsQuotidienne });
    }

    async fetchListeStationsQuotidienne(
        departement: Departement,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<ListeStationsData> {
        return this.fetchListeStationsFrequency(departement, { retries });
    }
}
