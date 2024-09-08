import { APIResponse } from '@/api/APIResponse.js';
import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { CommandeData, CommandeResult } from '@/telechargement/commande-fichier/api/CommandeResult.js';

export function fetchCommandeFichier<T extends CommandeData>(
    idCommande: string
): Promise<APIResponse<CommandeResult<T>>> {
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier`,
        params: {
            'id-cmde': idCommande,
        },
    });
}

export class NonExistentCommandeError extends Error {
    constructor(commandeId: string) {
        super(`Commande '${commandeId}' does not exist`);
    }
}

export class AlreadyDownloadedError extends Error {
    constructor(commandeId: string) {
        super(`Commande '${commandeId}' has already been downloaded`);
    }
}
