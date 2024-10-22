import { APIResponse } from '@/api/APIResponse.js';
import { HoraireDataAPIFetcher } from '@/paquet-stations-obs/paquet/stations/horaire/api/HoraireDataAPIFetcher.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export function createInMemoryHoraireDataAPIFetcher(db: Record<string, APIResponse> = {}): HoraireDataAPIFetcher {
    const map = new Map(
        Object.entries(db).map(([horaireDate, response]) => [HoraireDate.of(horaireDate).value(), response])
    );
    return function (horaireDate: HoraireDate) {
        return Promise.resolve(map.get(horaireDate.value()) ?? createNotFoundErrorAPIResponse(horaireDate));
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse(horaireDate: HoraireDate): APIResponse {
    return {
        code: 404,
        message: `Station '${horaireDate.value()}' not found`,
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
