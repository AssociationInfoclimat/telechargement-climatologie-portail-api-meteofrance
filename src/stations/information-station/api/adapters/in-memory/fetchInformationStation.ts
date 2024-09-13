import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InformationStationAPIFetcher } from '@/stations/information-station/api/InformationStationAPIFetcher.js';

export function createInMemoryInformationStationAPIFetcher(
    db: Record<string, APIResponse<unknown>> = {}
): InformationStationAPIFetcher {
    const map = new Map(Object.entries(db).map(([key, value]) => [IdStation.of(key).value(), value]));
    return (idStation: IdStation) => {
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
