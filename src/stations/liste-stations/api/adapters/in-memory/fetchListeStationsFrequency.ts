import { APIResponse } from '@/api/APIResponse.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function createInMemoryListeStationsAPIFetcher(
    db: Record<string, Record<number, APIResponse>> = {},
    {
        onMissingDepartementsResponse,
        onMissingDepartementResponse,
    }: {
        onMissingDepartementsResponse?: APIResponse;
        onMissingDepartementResponse?: APIResponse;
    } = {}
): ListeStationsAPIFetcher {
    const map = new Map(
        Object.entries(db).map(([frequence, stationsPerDepartement]) => [
            DataFrequency.of(frequence).value(),
            new Map(
                Object.entries(stationsPerDepartement).map(([departement, stations]) => [
                    Departement.of(+departement).value(),
                    stations,
                ])
            ),
        ])
    );
    return function ({ frequence, departement }: { frequence: DataFrequency; departement: Departement }) {
        const departements = map.get(frequence.value());
        if (!departements) {
            const response =
                onMissingDepartementsResponse ??
                createRequestErrorAPIResponse(`Frequency '${frequence.value()}' not found`);
            return Promise.resolve(response);
        }
        const missingDepartementResponse =
            onMissingDepartementResponse ?? createDepartementNotFoundErrorAPIResponse(departement);
        return Promise.resolve(departements.get(departement.value()) ?? missingDepartementResponse);
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 200,
        message: 'OK',
        data,
    };
}

export function createRequestErrorAPIResponse(message: string = ''): APIResponse {
    return {
        code: 400,
        message,
        data: null,
    };
}

export function createDepartementNotFoundErrorAPIResponse(departement: Departement): APIResponse {
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
} = {}): APIResponse {
    return {
        code,
        message,
        data,
    };
}
