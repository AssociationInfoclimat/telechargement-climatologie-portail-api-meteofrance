import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { wait } from '@/lib/wait.js';
import { CommandeFichierAPIFetcher } from '@/telechargement/commande-fichier/api/CommandeFichierAPIFetcher.js';
import { CommandeData, CommandeResult } from '@/telechargement/commande-fichier/api/CommandeResult.js';
import { z } from 'zod';

export class NonExistentCommandeError extends Error {
    constructor(commandeId: string) {
        super(`Commande '${commandeId}' does not exist`);
    }
}

export class AlreadyDownloadedError extends Error {
    constructor(commandeId: string) {
        super(`Commande '${commandeId}' has already been downloaded`);
    }
}

export class CommandeFichierFetcher {
    private readonly callCommandeFichierAPIFetcher: CommandeFichierAPIFetcher;
    private readonly retries: number;
    private readonly waitingTimeInMs;

    constructor({
        commandeFichierAPIFetcher,
        retries = 3,
        waitingTimeInMs = 5 * 1000,
    }: {
        commandeFichierAPIFetcher: CommandeFichierAPIFetcher;
        retries?: number;
        waitingTimeInMs?: number;
    }) {
        this.callCommandeFichierAPIFetcher = commandeFichierAPIFetcher;
        this.retries = retries;
        this.waitingTimeInMs = waitingTimeInMs;
    }

    async fetchCommandeFichier<T extends CommandeData>(idCommande: string): Promise<CommandeResult<T>> {
        const response = await this.callCommandeFichierAPIFetcher(idCommande);

        if (response.code === 502) {
            if (this.retries <= 0) {
                throw new TooManyRetriesError(response);
            }
            await wait(this.waitingTimeInMs);
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: this.callCommandeFichierAPIFetcher,
                retries: this.retries - 1,
                waitingTimeInMs: this.waitingTimeInMs,
            });
            return await fetcher.fetchCommandeFichier(idCommande);
        }
        if (response.code === 404) {
            throw new NonExistentCommandeError(idCommande);
        }
        if (response.code === 410) {
            throw new AlreadyDownloadedError(idCommande);
        }
        if (response.code === 500) {
            return {
                type: 'failed',
                message: `${response.message} :\n${JSON.stringify(response.data)}`,
            };
        }
        if (response.code === 507) {
            return {
                type: 'too-big',
            };
        }
        if (response.code === 204) {
            return {
                type: 'pending',
            };
        }

        if (response.code === 201) {
            const listResponseSchema = z.string().min(1);
            const data = listResponseSchema.parse(response.data);
            return {
                type: 'ready',
                data: data as T,
            };
        }

        throw new UnexpectedResponseError(response);
    }
}
