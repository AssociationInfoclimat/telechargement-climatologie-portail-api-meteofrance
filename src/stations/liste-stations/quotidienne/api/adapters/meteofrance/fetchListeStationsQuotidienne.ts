import { createFetchListeStationsFrequency } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const fetchListeStationsQuotidienne: ListeStationsAPIFetcher = createFetchListeStationsFrequency(
    DataFrequency.of('quotidienne')
);

export class ListeStationsQuotidienneFetcher extends ListeStationsFetcher {
    constructor({ retries = 3 }: { retries?: number } = {}) {
        super({ listeStationsAPIFetcher: fetchListeStationsQuotidienne, retries });
    }
}
