import { APIResponse } from '@/api/APIResponse.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export function createInMemoryCommandeStationAPIMaker(
    db: Record<string, Record<string, APIResponse>> = {}
): CommandeStationAPIMaker {
    const map = new Map(
        Object.entries(db).map(([frequence, frequenceDb]) => [
            DataFrequency.of(frequence).value(),
            new Map(
                Object.entries(frequenceDb).map(([stationId, response]) => [IdStation.of(stationId).value(), response])
            ),
        ])
    );
    return function ({ frequence, idStation, periodeCommande }) {
        const frequenceDb = map.get(frequence.value());
        if (!frequenceDb) {
            return Promise.resolve(createNotFoundErrorAPIResponse({ frequence, idStation, periodeCommande }));
        }
        return Promise.resolve(
            frequenceDb.get(idStation.value()) ??
                createNotFoundErrorAPIResponse({ frequence, idStation, periodeCommande })
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
    frequence,
    idStation,
    periodeCommande,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}): APIResponse {
    return {
        code: 404,
        message: `Station '${idStation.value()}' not found, for frequency '${frequence}' on periode : ${periodeCommande.value().debut} - ${periodeCommande.value().fin}`,
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
