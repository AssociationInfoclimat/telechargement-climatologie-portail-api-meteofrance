import {
    createFetchListeStationsFrequency,
    ListeStationsFrequencyFetcher,
} from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export const fetchListeStationsQuotidienne: ListeStationsAPIFetcher = createFetchListeStationsFrequency(
    DataFrequency.of('quotidienne')
);

export class ListeStationsQuotidienneFetcher extends ListeStationsFrequencyFetcher {
    constructor({ retries = 3 }: { retries?: number } = {}) {
        super({ listeStationsFetcher: fetchListeStationsQuotidienne, retries });
    }

    async fetchListeStationsQuotidienne(departement: Departement): Promise<ListeStationsData> {
        return this.fetchListeStationsFrequency(departement);
    }
}
