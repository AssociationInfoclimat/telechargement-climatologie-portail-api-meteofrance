import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { ParseError, ParseResult } from '@/csv/parseCSVUtils.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsAPIFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationLine, parseListeStationsCSV } from '@/paquet-obs/liste-stations/csv/parseCSV.js';
import { z } from 'zod';

export class ListeStationsFetcher {
    private readonly fetchListeStationsAPI: ListeStationsAPIFetcher;
    private readonly retries: number;
    private readonly waitingTimeInMs: number;

    constructor({
        fetchListeStationsAPI,
        retries = 3,
        waitingTimeInMs = 5 * 1000,
    }: {
        fetchListeStationsAPI: ListeStationsAPIFetcher;
        retries?: number;
        waitingTimeInMs?: number;
    }) {
        this.fetchListeStationsAPI = fetchListeStationsAPI;
        this.retries = retries;
        this.waitingTimeInMs = waitingTimeInMs;
    }

    async fetchListeStations(): Promise<ParseResult<ListeStationLine, ParseError<unknown>>> {
        const response = await this.fetchListeStationsAPI();
        if (response.code !== 200 && this.retries <= 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(this.waitingTimeInMs);
            const maker = new ListeStationsFetcher({
                fetchListeStationsAPI: this.fetchListeStationsAPI,
                retries: response.code === 502 ? this.retries : this.retries - 1,
                waitingTimeInMs: this.waitingTimeInMs,
            });
            return await maker.fetchListeStations();
        }
        if (response.code !== 200) {
            throw new UnexpectedResponseError(response);
        }
        return parseListeStationsCSV(z.string().min(0).parse(response.data));
    }
}
