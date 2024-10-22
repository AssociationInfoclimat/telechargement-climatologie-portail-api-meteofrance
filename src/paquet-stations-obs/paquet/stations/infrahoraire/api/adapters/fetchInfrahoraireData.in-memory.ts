import { APIResponse } from '@/api/APIResponse.js';
import { InfrahoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/infrahoraire/api/InfrahoraireDataAPIFetcher.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export function createInMemoryInfrahoraireDataAPIFetcher(
    db: Record<string, APIResponse> = {}
): InfrahoraireDataAPIFetcher {
    const map = new Map(
        Object.entries(db).map(([infrahoraireDate, response]) => [
            InfrahoraireDate.of(infrahoraireDate).value(),
            response,
        ])
    );
    return function (infrahoraireDate: InfrahoraireDate) {
        return Promise.resolve(map.get(infrahoraireDate.value()) ?? createNotFoundErrorAPIResponse(infrahoraireDate));
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse(infrahoraireDate: InfrahoraireDate): APIResponse {
    return {
        code: 404,
        message: `Station '${infrahoraireDate.value()}' not found`,
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
