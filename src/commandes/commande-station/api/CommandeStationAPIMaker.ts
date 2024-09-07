import { APIResponse } from '@/api/APIResponse.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';

export type CommandeStationAPIMaker = ({
    idStation,
    periodeCommande,
}: {
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}) => Promise<APIResponse<unknown>>;
