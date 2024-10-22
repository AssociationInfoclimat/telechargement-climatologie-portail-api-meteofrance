import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';

export type InfrahoraireDataAPIFetcher = (idStation: IdStation) => Promise<APIResponse>;
