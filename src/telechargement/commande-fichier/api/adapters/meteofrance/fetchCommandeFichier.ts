import { getMF } from '@/api/meteofrance/meteofrance-api-call.js';
import { CommandeFichierAPIFetcher } from '@/telechargement/commande-fichier/api/CommandeFichierAPIFetcher.js';

export const fetchCommandeFichier: CommandeFichierAPIFetcher = function (idCommande: string) {
    return getMF({
        url: `https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier`,
        params: {
            'id-cmde': idCommande,
        },
    });
};
