import { APIResponse } from '@/api/APIResponse.js';
import { HoraireDataAPIFetcher } from '@/paquet-obs/paquet/horaire/api/HoraireDataAPIFetcher.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function createInMemoryHoraireDataAPIFetcher(db: Record<number, APIResponse> = {}): HoraireDataAPIFetcher {
    const map = new Map(
        Object.entries(db).map(([departement, response]) => [Departement.of(+departement).value(), response])
    );
    return function (departement: Departement) {
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

export function createNotFoundErrorAPIResponse(departement: Departement): APIResponse {
    return {
        code: 404,
        message: `Station '${departement.value()}' not found`,
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
