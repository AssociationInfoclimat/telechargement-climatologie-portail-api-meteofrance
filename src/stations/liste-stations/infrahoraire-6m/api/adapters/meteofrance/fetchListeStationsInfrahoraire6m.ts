import { createListeStationsAPIFetcher } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';

export const fetchListeStationsInfrahoraire6m: ListeStationsAPIFetcher = createListeStationsAPIFetcher();
