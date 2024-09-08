import { APIResponse } from '@/api/APIResponse.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export type ListeStationsAPIFetcher = ({
    frequency,
    departement,
}: {
    frequency: DataFrequency;
    departement: Departement;
}) => Promise<APIResponse<unknown>>;
