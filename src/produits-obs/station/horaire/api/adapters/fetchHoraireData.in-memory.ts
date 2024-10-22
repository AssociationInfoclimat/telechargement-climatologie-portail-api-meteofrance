import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { HoraireDataAPIFetcher } from '@/produits-obs/station/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export function createInMemoryHoraireDataAPIFetcher(db: Record<string, APIResponse> = {}): HoraireDataAPIFetcher {
    const map = new Map(Object.entries(db).map(([stationId, response]) => [IdStation.of(stationId).value(), response]));
    return function ({ idStation, horaireDate }) {
        return Promise.resolve(
            map.get(idStation.value()) ?? createNotFoundErrorAPIResponse({ idStation, horaireDate })
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
    horaireDate,
}: {
    idStation: IdStation;
    horaireDate: HoraireDate;
}): APIResponse {
    return {
        code: 404,
        message: `Station '${idStation.value()}' not found on date '${horaireDate}'`,
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
