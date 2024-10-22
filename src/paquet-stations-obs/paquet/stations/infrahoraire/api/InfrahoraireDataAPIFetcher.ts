import { APIResponse } from '@/api/APIResponse.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export type InfrahoraireDataAPIFetcher = (infrahoraireDate: InfrahoraireDate) => Promise<APIResponse>;
