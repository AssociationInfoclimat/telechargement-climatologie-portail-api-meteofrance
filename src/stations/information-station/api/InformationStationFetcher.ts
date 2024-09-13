import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { wait } from '@/lib/wait.js';
import { fetchInformationStation } from '@/stations/information-station/api/adapters/meteofrance/fetchInformationStation.js';
import { InformationStationAPIFetcher } from '@/stations/information-station/api/InformationStationAPIFetcher.js';
import { InformationStationData } from '@/stations/information-station/api/InformationStationData.js';
import { z } from 'zod';

export class MissingInformationsError extends Error {
    readonly response: APIResponse;

    constructor({ stationId, response }: { stationId: IdStation; response: APIResponse }) {
        super(`Station '${stationId}' does not have any informations`);
        this.response = response;
    }
}

export class InformationStationFetcher {
    private readonly callInformationStationAPI: InformationStationAPIFetcher;
    private readonly retries: number;
    private readonly waitingTimeInMs: number;

    constructor({
        informationStationAPIFetcher = fetchInformationStation,
        retries = 3,
        waitingTimeInMs = 5 * 1000,
    }: {
        informationStationAPIFetcher?: InformationStationAPIFetcher;
        retries?: number;
        waitingTimeInMs?: number;
    } = {}) {
        this.callInformationStationAPI = informationStationAPIFetcher;
        this.retries = retries;
        this.waitingTimeInMs = waitingTimeInMs;
    }

    async fetchInformationStation(idStation: IdStation): Promise<InformationStationData> {
        const response = await this.callInformationStationAPI(idStation);
        if (response.code !== 200 && this.retries <= 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(this.waitingTimeInMs);
            const fetcher = new InformationStationFetcher({
                informationStationAPIFetcher: this.callInformationStationAPI,
                retries: response.code === 502 ? this.retries : this.retries - 1,
                waitingTimeInMs: this.waitingTimeInMs,
            });
            return await fetcher.fetchInformationStation(idStation);
        }
        if (response.code === 404) {
            throw new MissingInformationsError({ stationId: idStation, response });
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        const listResponseSchema = z.array(
            z.object({
                id: z.number(),
                nom: z.string(),
                lieuDit: z
                    .string()
                    .nullish()
                    .transform(value => value ?? null),
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
