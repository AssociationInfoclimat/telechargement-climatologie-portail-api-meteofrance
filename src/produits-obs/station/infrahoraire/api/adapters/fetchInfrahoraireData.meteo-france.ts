import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export function fetchInfrahoraireData({
    idStation,
    infrahoraireDate,
}: {
    idStation: IdStation;
    infrahoraireDate: InfrahoraireDate;
}): Promise<APIResponse> {
    return getMF({
        url: 'https://public-api.meteofrance.fr/public/DPObs/v1/station/infrahoraire-6m',
        params: {
            id_station: idStation.value(),
            date: infrahoraireDate.value(),
            format: 'json',
        },
    });
}
