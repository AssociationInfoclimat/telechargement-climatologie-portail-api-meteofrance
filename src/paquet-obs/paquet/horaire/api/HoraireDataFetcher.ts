import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { HoraireDataAPIFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataAPIFetcher.js';
import {
    buildHoraireLineSchema,
    HoraireLine,
    HoraireLineSchema,
} from '@/produits-obs/station/horaire/json/HoraireLine.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { z } from 'zod';

export class HoraireDataFetcher {
    private readonly fetchHoraireDataAPI: HoraireDataAPIFetcher;
    private readonly retries: number;
    private readonly waitingTimeInMs: number;
    private readonly horaireLineSchema: HoraireLineSchema;

    constructor({
        fetchHoraireDataAPI,
        retries = 3,
        waitingTimeInMs = 5 * 1000,
        horaireLineSchema,
    }: {
        fetchHoraireDataAPI: HoraireDataAPIFetcher;
        retries?: number;
        waitingTimeInMs?: number;
        horaireLineSchema?: HoraireLineSchema;
    }) {
        this.fetchHoraireDataAPI = fetchHoraireDataAPI;
        this.retries = retries;
        this.waitingTimeInMs = waitingTimeInMs;
        this.horaireLineSchema =
            horaireLineSchema ||
            buildHoraireLineSchema(ctx => {
                LoggerSingleton.getSingleton().warn({
                    message: 'Invalid value in incoming data replaced by default value',
                    data: ctx.error,
                });
            });
    }

    async fetchHoraireData(departement: Departement): Promise<HoraireLine[]> {
        const response = await this.fetchHoraireDataAPI(departement);
        if (response.code !== 200 && this.retries <= 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(this.waitingTimeInMs);
            const maker = new HoraireDataFetcher({
                fetchHoraireDataAPI: this.fetchHoraireDataAPI,
                retries: response.code === 502 ? this.retries : this.retries - 1,
                waitingTimeInMs: this.waitingTimeInMs,
            });
            return await maker.fetchHoraireData(departement);
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        return z.array(this.horaireLineSchema).parse(response.data);
    }
}
