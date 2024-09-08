import { APIResponse } from '@/api/APIResponse.js';
import { IdCommande } from '@/IdCommande.js';
import { CommandeFichierAPIFetcher } from '@/telechargement/commande-fichier/api/CommandeFichierAPIFetcher.js';

export function createInMemoryCommandeFichierAPIFetcher(
    db: Record<string, APIResponse<unknown>> = {}
): CommandeFichierAPIFetcher {
    const map = new Map(Object.entries(db));
    return function (idCommande: IdCommande) {
        return Promise.resolve(map.get(idCommande) ?? createNotFoundErrorAPIResponse(idCommande));
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 201,
        message: 'OK',
        data,
    };
}

export function createPendingAPIResponse({
    message = '',
    data = {},
}: {
    message?: string;
    data?: unknown;
} = {}): APIResponse<unknown> {
    return {
        code: 204,
        message,
        data,
    };
}

export function createNotFoundErrorAPIResponse(idCommande: IdCommande): APIResponse<unknown> {
    return {
        code: 404,
        message: `Commande '${idCommande}' not found`,
        data: null,
    };
}

export function createAlreadyDownloadedAPIResponse({
    message = '',
    data = {},
}: {
    message?: string;
    data?: unknown;
} = {}): APIResponse<unknown> {
    return {
        code: 410,
        message,
        data,
    };
}

export function createFailedAPIResponse({
    message = '',
    data = {},
}: {
    message?: string;
    data?: unknown;
} = {}): APIResponse<unknown> {
    return {
        code: 500,
        message,
        data,
    };
}

export function createServerErrorAPIResponse({
    message = '',
    data = {},
}: {
    message?: string;
    data?: unknown;
} = {}): APIResponse<unknown> {
    return {
        code: 502,
        message,
        data,
    };
}

export function createTooBigAPIResponse({
    message = '',
    data = {},
}: {
    message?: string;
    data?: unknown;
} = {}): APIResponse<unknown> {
    return {
        code: 507,
        message,
        data,
    };
}
