import { APIResponse } from '@/api/APIResponse.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export type HoraireDataAPIFetcher = (horaireDate: HoraireDate) => Promise<APIResponse>;
