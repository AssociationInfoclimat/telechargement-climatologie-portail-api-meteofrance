import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { IdStation } from '@/id-station/IdStation.js';

export function fetchInfrahoraireData(idStation: IdStation): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPPaquetObs/v1/paquet/infrahoraire-6m',
        params: {
            id_station: idStation.value(),
            format: 'json',
        },
    });
}
