import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { InfrahoraireDataAPIFetcher } from '@/produits-obs/station/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';
import {
    buildInfrahoraireLineSchema,
    InfrahoraireLine,
    InfrahoraireLineSchema,
} from '@/produits-obs/station/infrahoraire/json/InfrahoraireLine.js';
import { z } from 'zod';

export class InfrahoraireDataFetcher {
    private readonly fetchInfrahoraireDataAPI: InfrahoraireDataAPIFetcher;
    private readonly retries: number;
    private readonly waitingTimeInMs: number;
    private readonly infrahoraireLineSchema: InfrahoraireLineSchema;

    constructor({
        fetchInfrahoraireDataAPI,
        retries = 3,
        waitingTimeInMs = 5 * 1000,
        infrahoraireLineSchema,
    }: {
        fetchInfrahoraireDataAPI: InfrahoraireDataAPIFetcher;
        retries?: number;
        waitingTimeInMs?: number;
        infrahoraireLineSchema?: InfrahoraireLineSchema;
    }) {
        this.fetchInfrahoraireDataAPI = fetchInfrahoraireDataAPI;
        this.retries = retries;
        this.waitingTimeInMs = waitingTimeInMs;
        this.infrahoraireLineSchema =
            infrahoraireLineSchema ||
            buildInfrahoraireLineSchema(ctx => {
                LoggerSingleton.getSingleton().warn({
                    message: 'Invalid value in incoming data replaced by default value',
                    data: ctx.error,
                });
            });
    }

    async fetchInfrahoraireData({
        idStation,
        infrahoraireDate,
    }: {
        idStation: IdStation;
        infrahoraireDate: InfrahoraireDate;
    }): Promise<InfrahoraireLine> {
        const response = await this.fetchInfrahoraireDataAPI({ idStation, infrahoraireDate });
        if (response.code !== 200 && this.retries <= 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(this.waitingTimeInMs);
            const maker = new InfrahoraireDataFetcher({
                fetchInfrahoraireDataAPI: this.fetchInfrahoraireDataAPI,
                retries: response.code === 502 ? this.retries : this.retries - 1,
                waitingTimeInMs: this.waitingTimeInMs,
                infrahoraireLineSchema: this.infrahoraireLineSchema,
            });
            return await maker.fetchInfrahoraireData({ idStation, infrahoraireDate });
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        return z.array(this.infrahoraireLineSchema).nonempty().parse(response.data)[0];
    }
}
