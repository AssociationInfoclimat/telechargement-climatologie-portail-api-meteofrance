import { APIResponse } from '@/api/APIResponse.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export type ListeStationsAPIFetcher = (departement: Departement) => Promise<APIResponse<unknown>>;
