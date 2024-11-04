import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';

export function fetchListeStations(): Promise<APIResponse> {
    return getMF({ url: 'https://public-api.meteofrance.fr/public/DPPaquetObs/v1/liste-stations' });
}
