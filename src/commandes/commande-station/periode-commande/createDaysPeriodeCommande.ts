import {
    DayCommande,
    getEndOfDayDateCommande,
    getStartOfDayDateCommande,
} from '@/commandes/commande-station/periode-commande/createDayPeriodeCommande.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface DaysCommande {
    debut: DayCommande;
    fin: DayCommande;
}

export function createDaysPeriodeCommande(daysCommande: DaysCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfDayDateCommande(daysCommande.debut),
        fin: getEndOfDayDateCommande(daysCommande.fin),
    });
}
