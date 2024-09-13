import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandeStationData } from '@/commandes/commande-station/api/CommandeStationData.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export function makeCommandeStation({
    frequence,
    idStation,
    periodeCommande,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}): Promise<APIResponse<CommandeStationData>> {
    const { debut, fin } = periodeCommande.value();
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/${frequence.value()}`,
        params: {
            'id-station': idStation.value(),
            'date-deb-periode': debut,
            'date-fin-periode': fin,
        },
    });
}

export function createCommandeStationAPIMaker(): CommandeStationAPIMaker {
    return function ({ frequence, idStation, periodeCommande }) {
        return makeCommandeStation({ frequence, idStation, periodeCommande });
    };
}
