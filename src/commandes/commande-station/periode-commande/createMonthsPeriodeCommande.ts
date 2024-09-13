import {
    getEndOfMonthDateCommande,
    getStartOfMonthDateCommande,
    MonthCommande,
} from '@/commandes/commande-station/periode-commande/createMonthPeriodeCommande.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface MonthsCommande {
    debut: MonthCommande;
    fin: MonthCommande;
}

export function createMonthsPeriodeCommande(monthsCommande: MonthsCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfMonthDateCommande(monthsCommande.debut),
        fin: getEndOfMonthDateCommande(monthsCommande.fin),
    });
}
