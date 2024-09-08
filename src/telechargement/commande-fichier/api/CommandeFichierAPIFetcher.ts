import { APIResponse } from '@/api/APIResponse.js';

export type CommandeFichierAPIFetcher = (idCommande: string) => Promise<APIResponse<unknown>>;
