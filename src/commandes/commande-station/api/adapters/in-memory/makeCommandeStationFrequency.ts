import { APIResponse } from '@/api/APIResponse.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';

export function createInMemoryCommandeStationAPIMaker(
    db: Record<string, APIResponse<unknown>> = {}
): CommandeStationAPIMaker {
    const map = new Map(Object.entries(db).map(([key, value]) => [IdStation.of(key).value(), value]));
    return function ({ idStation, periodeCommande }) {
        return Promise.resolve(
            map.get(idStation.value()) ?? createNotFoundErrorAPIResponse({ idStation, periodeCommande })
        );
    };
}

export function createSuccessfulAPIResponse<T>(data: T): APIResponse<T> {
    return {
        code: 202,
        message: 'OK',
        data,
    };
}

export function createNotFoundErrorAPIResponse({
    idStation,
    periodeCommande,
}: {
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}): APIResponse<unknown> {
    return {
        code: 404,
        message: `Station '${idStation.value()}' not found, for periode : ${periodeCommande.value().debut} - ${periodeCommande.value().fin}`,
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
