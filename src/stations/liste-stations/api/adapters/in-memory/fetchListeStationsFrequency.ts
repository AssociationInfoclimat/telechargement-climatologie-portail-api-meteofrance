import { APIResponse } from '@/api/APIResponse.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function createInMemoryListeStationsAPIFetcher(
    db: Record<string, Record<number, APIResponse<unknown>>> = {},
    {
        onMissingDepartementsResponse,
        onMissingDepartementResponse,
    }: {
        onMissingDepartementsResponse?: APIResponse<unknown>;
        onMissingDepartementResponse?: APIResponse<unknown>;
    } = {}
): ListeStationsAPIFetcher {
    const map = new Map(
        Object.entries(db).map(([frequency, stationsPerDepartement]) => [
            DataFrequency.of(frequency).value(),
            new Map(
                Object.entries(stationsPerDepartement).map(([departement, stations]) => [
                    Departement.of(+departement).value(),
                    stations,
                ])
            ),
        ])
    );
    return function ({ frequency, departement }: { frequency: DataFrequency; departement: Departement }) {
        const departements = map.get(frequency.value());
        if (!departements) {
            const response =
                onMissingDepartementsResponse ??
                createRequestErrorAPIResponse(`Frequency '${frequency.value()}' not found`);
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

export function createRequestErrorAPIResponse(message: string = ''): APIResponse<unknown> {
    return {
        code: 400,
        message,
        data: null,
    };
}

export function createDepartementNotFoundErrorAPIResponse(departement: Departement): APIResponse<unknown> {
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
