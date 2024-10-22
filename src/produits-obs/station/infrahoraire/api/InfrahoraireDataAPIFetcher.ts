import { APIResponse } from '@/api/APIResponse.js';
import { IdStation } from '@/id-station/IdStation.js';
import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export type InfrahoraireDataAPIFetcher = ({
    idStation,
    infrahoraireDate,
}: {
    idStation: IdStation;
    infrahoraireDate: InfrahoraireDate;
}) => Promise<APIResponse>;
