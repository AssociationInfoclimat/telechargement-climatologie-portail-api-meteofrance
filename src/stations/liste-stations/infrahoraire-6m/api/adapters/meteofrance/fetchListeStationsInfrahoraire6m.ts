import { createListeStationsAPIFetcher } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const fetchListeStationsInfrahoraire6m: ListeStationsAPIFetcher = createListeStationsAPIFetcher(
    DataFrequency.of('infrahoraire-6m')
);
