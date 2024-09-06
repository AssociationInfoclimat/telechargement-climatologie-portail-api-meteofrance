import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { z } from 'zod';

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

export const createFetchListeStationsFrequency =
    (frequency: DataFrequency): ListeStationsFetcher =>
    (departement: Departement) =>
        fetchListeStationsFrequency({ frequency, departement });

export class ListeStationsFrequencyFetcher {
    private readonly callListeStationsAPI: ListeStationsFetcher;
    private retries: number;

    protected constructor({
        listeStationsFetcher,
        retries = 3,
    }: {
        listeStationsFetcher: ListeStationsFetcher;
        retries?: number;
    }) {
        this.callListeStationsAPI = listeStationsFetcher;
        this.retries = retries;
    }

    protected async fetchListeStationsFrequency(departement: Departement): Promise<ListeStationsData> {
        const response = await this.callListeStationsAPI(departement);
        if (response.code !== 200 && this.retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            this.retries--;
            return await this.fetchListeStationsFrequency(departement);
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        const listResponseSchema = z.array(
            z.object({
                id: z.string(),
                nom: z.string(),
                posteOuvert: z.boolean(),
                typePoste: z.number(),
                lon: z.number(),
                lat: z.number(),
                alt: z.number(),
                postePublic: z.boolean(),
            })
        );
        return listResponseSchema.parse(response.data);
    }
}
