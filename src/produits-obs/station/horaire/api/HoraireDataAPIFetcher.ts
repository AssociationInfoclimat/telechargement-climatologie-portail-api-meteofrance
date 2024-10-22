import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export type HoraireDataAPIFetcher = ({
    idStation,
    horaireDate,
}: {
    idStation: IdStation;
    horaireDate: HoraireDate;
}) => Promise<APIResponse>;
