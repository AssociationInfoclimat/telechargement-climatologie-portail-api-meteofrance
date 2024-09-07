import { APIResponse } from '@/api/APIResponse.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function createInMemoryListeStationsAPIFetcher(
    db: Record<number, APIResponse<unknown>> = {}
): ListeStationsAPIFetcher {
    const map = new Map(Object.entries(db).map(([key, value]) => [Departement.of(+key).value(), value]));
    return (departement: Departement) => {
        return Promise.resolve(map.get(departement.value()) ?? createNotFoundErrorAPIResponse(departement));
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse(departement: Departement): APIResponse<unknown> {
    return {
        code: 404,
        message: `Departement '${departement.value()}' not found`,
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
} = {}): APIResponse<unknown> {
    return {
        code,
        message,
        data,
    };
}
