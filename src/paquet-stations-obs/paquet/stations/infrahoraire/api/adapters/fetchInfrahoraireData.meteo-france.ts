import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export function fetchInfrahoraireData(infrahoraireDate: InfrahoraireDate): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPPaquetObs/v1/paquet/stations/infrahoraire-6m',
        params: {
            date: infrahoraireDate.value(),
            format: 'json',
        },
    });
}
