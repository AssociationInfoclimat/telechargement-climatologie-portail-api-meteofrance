import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import {
    createAlreadyDownloadedAPIResponse,
    createFailedAPIResponse,
    createInMemoryCommandeFichierAPIFetcher,
    createPendingAPIResponse,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
    createTooBigAPIResponse,
} from '@/telechargement/commande-fichier/api/adapters/in-memory/fetchCommandeFichier.js';
import {
    AlreadyDownloadedError,
    CommandeFichierFetcher,
    NonExistentCommandeError,
} from '@/telechargement/commande-fichier/api/CommandeFichierFetcher.js';
import { describe, expect, it } from 'vitest';

describe('CommandeFichierFetcher', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createServerErrorAPIResponse(),
                }),
                waitingTimeInMs: 0,
            });
            await expect(() => fetcher.fetchCommandeFichier('779369825174')).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when non existing commande', () => {
        it('should throw non existent commande error', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher(),
            });
            await expect(() => fetcher.fetchCommandeFichier('779369825174')).rejects.toThrow(NonExistentCommandeError);
        });
    });
    describe('when already downloaded commande', () => {
        it('should throw already downloaded commande error', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createAlreadyDownloadedAPIResponse(),
                }),
            });
            await expect(() => fetcher.fetchCommandeFichier('779369825174')).rejects.toThrow(AlreadyDownloadedError);
        });
    });
    describe('when failed commande', () => {
        it('should return failed commande', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createFailedAPIResponse({ message: 'error', data: 'data' }),
                }),
            });
            const fetched = await fetcher.fetchCommandeFichier('779369825174');
            expect(fetched).toEqual({ type: 'failed', message: 'error :\n"data"' });
        });
    });
    describe('when too big commande', () => {
        it('should return too big commande', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createTooBigAPIResponse(),
                }),
            });
            const fetched = await fetcher.fetchCommandeFichier('779369825174');
            expect(fetched).toEqual({ type: 'too-big' });
        });
    });
    describe('when pending commande', () => {
        it('should return pending commande', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createPendingAPIResponse(),
                }),
            });
            const fetched = await fetcher.fetchCommandeFichier('779369825174');
            expect(fetched).toEqual({ type: 'pending' });
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': { code: 200, message: '', data: {} },
                }),
            });
            await expect(() => fetcher.fetchCommandeFichier('779369825174')).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createSuccessfulAPIResponse([{ key: 'value' }]),
                }),
            });
            await expect(() => fetcher.fetchCommandeFichier('779369825174')).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the commande result', async () => {
            const fetcher = new CommandeFichierFetcher({
                commandeFichierAPIFetcher: createInMemoryCommandeFichierAPIFetcher({
                    '779369825174': createSuccessfulAPIResponse('data'),
                }),
            });
            const fetched = await fetcher.fetchCommandeFichier('779369825174');
            expect(fetched).toEqual({
                type: 'ready',
                data: 'data',
            });
        });
    });
});
