import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function fetchHoraireData(departement: Departement): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPPaquetObs/v2/paquet/horaire',
        params: {
            'id-departement': departement.value().toString(),
            format: 'json',
        },
    });
}
