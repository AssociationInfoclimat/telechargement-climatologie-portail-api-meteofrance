import {
    createFetchListeStationsFrequency,
    ListeStationsFrequencyFetcher,
} from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export const fetchListeStationsInfrahoraire6m = createFetchListeStationsFrequency(DataFrequency.of('infrahoraire-6m'));

export class ListeStationsInfrahoraire6mFetcher extends ListeStationsFrequencyFetcher {
    constructor() {
        super({ listeStationsFetcher: fetchListeStationsInfrahoraire6m });
    }

    async fetchListeStationsInfrahoraire6m(
        departement: Departement,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<ListeStationsData> {
        return this.fetchListeStationsFrequency(departement, { retries });
    }
}
