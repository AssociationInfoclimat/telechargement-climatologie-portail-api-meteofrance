import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { z } from 'zod';

export class ListeStationsFetcher {
    private readonly callListeStationsAPI: ListeStationsAPIFetcher;
    private retries: number;

    protected constructor({
        listeStationsAPIFetcher,
        retries = 3,
    }: {
        listeStationsAPIFetcher: ListeStationsAPIFetcher;
        retries?: number;
    }) {
        this.callListeStationsAPI = listeStationsAPIFetcher;
        this.retries = retries;
    }

    async fetchListeStations(departement: Departement): Promise<ListeStationsData> {
        const response = await this.callListeStationsAPI(departement);
        if (response.code !== 200 && this.retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            this.retries--;
            return await this.fetchListeStations(departement);
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
