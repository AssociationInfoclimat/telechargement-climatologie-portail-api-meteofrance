import { APIResponse } from '@/api/APIResponse.js';
import { ListeStationsAPIFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsAPIFetcher.js';

export function createInMemoryListeStationsAPIFetcher(response: APIResponse): ListeStationsAPIFetcher {
    return function () {
        return Promise.resolve(response);
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse(): APIResponse {
    return {
        code: 404,
        message: `Liste des stations indisponible`,
        data: null,
    };
}

export function createServerErrorAPIResponse({
    code = 500,
    message = '',
    data = {},
}: {
    code?: 500 | 502;
    message?: string;
    data?: unknown;
} = {}): APIResponse {
    return {
        code,
        message,
        data,
    };
}
