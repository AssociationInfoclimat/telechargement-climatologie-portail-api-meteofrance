import { get } from '@/api/api-call.js';
import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsData } from '@/stations/liste-stations/api/ListeStationsData.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { z } from 'zod';

export function fetchListeStationsInfrahoraire6m({
    departement,
    token,
}: {
    departement: Departement;
    token: string;
}): Promise<APIResponse<ListeStationsData>> {
    return get({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/infrahoraire-6m`,
        params: {
            'id-departement': departement.value().toString(),
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export class ListeStationsInfrahoraire6mFetcher {
    async fetchListeStationsInfrahoraire6m(
        departement: Departement,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<ListeStationsData> {
        const tokenStorage = TokenStorage.getSingleton();
        const response = await fetchListeStationsInfrahoraire6m({
            departement,
            token: await tokenStorage.getToken(),
        });
        if (response.code !== 200 && retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if (response.code === 401) {
            await tokenStorage.updateToken();
            return await this.fetchListeStationsInfrahoraire6m(departement, { retries: retries - 1 });
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            return await this.fetchListeStationsInfrahoraire6m(departement, { retries: retries - 1 });
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
