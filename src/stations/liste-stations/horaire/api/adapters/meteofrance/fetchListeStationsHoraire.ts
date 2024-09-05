import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { z } from 'zod';

export function fetchListeStationsHoraire(departement: Departement): Promise<APIResponse<ListeStationsData>> {
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/horaire`,
        params: {
            'id-departement': departement.value().toString(),
        },
    });
}

export class ListeStationsHoraireFetcher {
    async fetchListeStationsHoraire(
        departement: Departement,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<ListeStationsData> {
        const response = await fetchListeStationsHoraire(departement);
        if (response.code !== 200 && retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if (response.code === 401) {
            const tokenStorage = TokenStorage.getSingleton();
            await tokenStorage.updateToken();
            return await this.fetchListeStationsHoraire(departement, { retries });
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            return await this.fetchListeStationsHoraire(departement, { retries: retries - 1 });
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
