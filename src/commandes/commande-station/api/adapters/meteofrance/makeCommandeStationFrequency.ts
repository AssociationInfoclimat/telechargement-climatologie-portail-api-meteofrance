import { APIResponse, TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandeStationData } from '@/commandes/commande-station/api/CommandeStationData.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { wait } from '@/lib/wait.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { z } from 'zod';

export function makeCommandeStationFrequency({
    frequency,
    idStation,
    periodeCommande,
}: {
    frequency: DataFrequency;
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
}): Promise<APIResponse<CommandeStationData>> {
    const { debut, fin } = periodeCommande.value();
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/${frequency.value()}`,
        params: {
            'id-station': idStation.value(),
            'date-deb-periode': debut,
            'date-fin-periode': fin,
        },
    });
}

export function createCommandeStationAPIMaker(frequency: DataFrequency): CommandeStationAPIMaker {
    return ({ idStation, periodeCommande }) =>
        makeCommandeStationFrequency({
            frequency,
            idStation,
            periodeCommande,
        });
}

export class CommandeStationFrequencyMaker {
    private readonly callCommandeStationAPI: CommandeStationAPIMaker;

    protected constructor({ commandeStationApiMaker }: { commandeStationApiMaker: CommandeStationAPIMaker }) {
        this.callCommandeStationAPI = commandeStationApiMaker;
    }

    protected async makeCommandeStationFrequency(
        {
            idStation,
            periodeCommande,
        }: {
            idStation: IdStation;
            periodeCommande: PeriodeCommande;
        },
        { retries = 3 }: { retries?: number } = {}
    ): Promise<IdCommande> {
        const response = await this.callCommandeStationAPI({
            idStation,
            periodeCommande,
        });
        if (response.code !== 202 && retries === 0) {
            throw new TooManyRetriesError(response);
        }
        if ([500, 502].includes(response.code)) {
            await wait(5 * 1000);
            return await this.makeCommandeStationFrequency({ idStation, periodeCommande }, { retries: retries - 1 });
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
