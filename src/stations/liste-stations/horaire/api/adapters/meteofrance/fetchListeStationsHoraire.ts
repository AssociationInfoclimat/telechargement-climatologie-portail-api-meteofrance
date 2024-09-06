import { createFetchListeStationsFrequency } from '@/stations/liste-stations/api/adapters/meteofrance/fetchListeStationsFrequency.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export const fetchListeStationsHoraire: ListeStationsAPIFetcher = createFetchListeStationsFrequency(
    DataFrequency.of('horaire')
);
