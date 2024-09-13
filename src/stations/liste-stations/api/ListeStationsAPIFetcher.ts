import { APIResponse } from '@/api/APIResponse.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export type ListeStationsAPIFetcher = ({
    frequence,
    departement,
}: {
    frequence: DataFrequency;
    departement: Departement;
}) => Promise<APIResponse>;
