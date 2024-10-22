import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { IdStation } from '@/id-station/IdStation.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export function fetchHoraireData({
    idStation,
    horaireDate,
}: {
    idStation: IdStation;
    horaireDate: HoraireDate;
}): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPObs/v1/station/horaire',
        params: {
            id_station: idStation.value(),
            date: horaireDate.value(),
            format: 'json',
        },
    });
}
