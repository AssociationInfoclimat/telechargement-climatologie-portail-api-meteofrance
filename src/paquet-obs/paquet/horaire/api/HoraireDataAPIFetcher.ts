import { APIResponse } from '@/api/APIResponse.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export type HoraireDataAPIFetcher = (departement: Departement) => Promise<APIResponse>;
