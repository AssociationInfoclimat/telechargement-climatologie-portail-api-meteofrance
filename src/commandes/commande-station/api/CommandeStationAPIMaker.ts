import { APIResponse } from '@/api/APIResponse.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export type CommandeStationAPIMaker = ({
    frequence,
    idStation,
    periodeCommande,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}) => Promise<APIResponse>;
