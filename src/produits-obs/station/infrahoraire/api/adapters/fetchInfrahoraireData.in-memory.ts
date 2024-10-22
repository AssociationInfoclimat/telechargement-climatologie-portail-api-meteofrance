import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDataAPIFetcher } from '@/produits-obs/station/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export function createInMemoryInfrahoraireDataAPIFetcher(
    db: Record<string, APIResponse> = {}
): InfrahoraireDataAPIFetcher {
    const map = new Map(Object.entries(db).map(([stationId, response]) => [IdStation.of(stationId).value(), response]));
    return function ({ idStation, infrahoraireDate }) {
        return Promise.resolve(
            map.get(idStation.value()) ?? createNotFoundErrorAPIResponse({ idStation, infrahoraireDate })
        );
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse({
    idStation,
    infrahoraireDate,
}: {
    idStation: IdStation;
    infrahoraireDate: InfrahoraireDate;
}): APIResponse {
    return {
        code: 404,
        message: `Station '${idStation.value()}' not found on date '${infrahoraireDate}'`,
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
