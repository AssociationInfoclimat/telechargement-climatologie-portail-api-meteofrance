import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InformationStationAPIFetcher } from '@/stations/information-station/api/InformationStationAPIFetcher.js';

export const fetchInformationStation: InformationStationAPIFetcher = (idStation: IdStation) => {
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/information-station`,
        params: {
            'id-station': idStation.value(),
        },
    });
};
