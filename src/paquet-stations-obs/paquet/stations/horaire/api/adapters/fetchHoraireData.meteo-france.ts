import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export function fetchHoraireData(horaireDate: HoraireDate): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPPaquetObs/v1/paquet/stations/horaire',
        params: {
            date: horaireDate.value(),
            format: 'json',
        },
    });
}
