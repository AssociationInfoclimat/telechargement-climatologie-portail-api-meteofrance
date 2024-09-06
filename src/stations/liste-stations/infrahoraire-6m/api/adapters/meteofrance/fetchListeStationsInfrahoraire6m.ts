import { createFetchListeStationsFrequency } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export const fetchListeStationsInfrahoraire6m: ListeStationsAPIFetcher = createFetchListeStationsFrequency(
    DataFrequency.of('infrahoraire-6m')
);

export class ListeStationsInfrahoraire6mFetcher extends ListeStationsFetcher {
    constructor({ retries = 3 }: { retries?: number } = {}) {
        super({ listeStationsAPIFetcher: fetchListeStationsInfrahoraire6m, retries });
    }

    async fetchListeStationsInfrahoraire6m(departement: Departement): Promise<ListeStationsData> {
        return this.fetchListeStations(departement);
    }
}
