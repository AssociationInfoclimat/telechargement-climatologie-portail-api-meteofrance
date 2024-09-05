import { get } from '@/api/api-call.js';
import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';
import { IdStation } from '@/id-station/IdStation.js';
import { wait } from '@/lib/wait.js';
import { InformationStationData } from '@/stations/information-station/api/InformationStationData.js';
import { z } from 'zod';

export function fetchInformationStation({
    idStation,
    token,
}: {
    idStation: IdStation;
    token: string;
}): Promise<APIResponse<InformationStationData>> {
    return get({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/information-station`,
        params: {
            'id-station': idStation.value(),
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export class InformationStationFetcher {
    async fetchInformationStation(
        idStation: IdStation,
        { retries = 3 }: { retries?: number } = {}
    ): Promise<InformationStationData> {
        const tokenStorage = TokenStorage.getSingleton();
        const response = await fetchInformationStation({
            idStation,
            token: await tokenStorage.getToken(),
        });
        if (response.code !== 200 && retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if (response.code === 401) {
            await tokenStorage.updateToken();
            return await this.fetchInformationStation(idStation, { retries: retries - 1 });
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            return await this.fetchInformationStation(idStation, { retries: retries - 1 });
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        const listResponseSchema = z.array(
            z.object({
                id: z.number(),
                nom: z.string(),
                lieuDit: z.string(),
                bassin: z.string(),
                dateDebut: z.string(),
                dateFin: z.string(),
                typesPoste: z.array(
                    z.object({
                        type: z.number(),
                        dateDebut: z.string(),
                        dateFin: z.string(),
                    })
                ),
                parametres: z.array(
                    z.object({
                        nom: z.string(),
                        dateDebut: z.string(),
                        dateFin: z.string(),
                    })
                ),
                producteurs: z.array(
                    z.object({
                        nom: z.string(),
                        dateDebut: z.string(),
                        dateFin: z.string(),
                    })
                ),
                positions: z.array(
                    z.object({
                        altitude: z.number(),
                        latitude: z.number(),
                        longitude: z.number(),
                        dateDebut: z.string(),
                        dateFin: z.string(),
                    })
                ),
            })
        );
        return listResponseSchema.parse(response.data);
    }
}
