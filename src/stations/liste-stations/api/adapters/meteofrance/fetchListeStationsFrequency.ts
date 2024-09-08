import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function fetchListeStationsFrequency({
    frequency,
    departement,
}: {
    frequency: DataFrequency;
    departement: Departement;
}): Promise<APIResponse<ListeStationsData>> {
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/${frequency.value()}`,
        params: {
            'id-departement': departement.value().toString(),
        },
    });
}

export function createListeStationsAPIFetcher(): ListeStationsAPIFetcher {
    return fetchListeStationsFrequency;
}
