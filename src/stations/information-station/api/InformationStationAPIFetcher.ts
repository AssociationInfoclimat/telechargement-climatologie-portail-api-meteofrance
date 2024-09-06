import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';

export type InformationStationAPIFetcher = (idStation: IdStation) => Promise<APIResponse<unknown>>;
