import { get } from '@/api/api-call.js';
import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';
import { CommandeStationData } from '@/commandes/commande-station/api/CommandeStationData.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { wait } from '@/lib/wait.js';
import { z } from 'zod';

export function makeCommandeStationInfrahoraire6m({
    idStation,
    periodeCommande,
    token,
}: {
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
    token: string;
}): Promise<APIResponse<CommandeStationData>> {
    const { debut, fin } = periodeCommande.value();
    return get({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/infrahoraire-6m`,
        params: {
            'id-station': idStation.value(),
            'date-deb-periode': debut,
            'date-fin-periode': fin,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export class CommandeStationInfrahoraire6mMaker {
    async makeCommandeStationInfrahoraire6m(
        {
            idStation,
            periodeCommande,
        }: {
            idStation: IdStation;
            periodeCommande: PeriodeCommande;
        },
        { retries = 3 }: { retries?: number } = {}
    ): Promise<IdCommande> {
        const tokenStorage = TokenStorage.getSingleton();
        const response = await makeCommandeStationInfrahoraire6m({
            idStation,
            periodeCommande,
            token: await tokenStorage.getToken(),
        });
        if (response.code !== 202 && retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if (response.code === 401) {
            await tokenStorage.updateToken();
            return await this.makeCommandeStationInfrahoraire6m(
                { idStation, periodeCommande },
                { retries: retries - 1 }
            );
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            return await this.makeCommandeStationInfrahoraire6m(
                { idStation, periodeCommande },
                { retries: retries - 1 }
            );
        }
        if (response.code !== 202) {
            throw new UnexpectedResponseError(response);
        }
        const schema = z.object({
            elaboreProduitAvecDemandeResponse: z.object({
                return: z.string(),
            }),
        });
        const data = schema.parse(response.data);
        return data.elaboreProduitAvecDemandeResponse.return;
    }
}
