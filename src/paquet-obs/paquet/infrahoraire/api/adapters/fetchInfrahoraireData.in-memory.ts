import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDataAPIFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataAPIFetcher.js';

export function createInMemoryInfrahoraireDataAPIFetcher(
    db: Record<string, APIResponse> = {}
): InfrahoraireDataAPIFetcher {
    const map = new Map(Object.entries(db).map(([stationId, response]) => [IdStation.of(stationId).value(), response]));
    return function (idStation: IdStation) {
        return Promise.resolve(map.get(idStation.value()) ?? createNotFoundErrorAPIResponse(idStation));
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse(idStation: IdStation): APIResponse {
    return {
        code: 404,
        message: `Station '${idStation.value()}' not found`,
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
