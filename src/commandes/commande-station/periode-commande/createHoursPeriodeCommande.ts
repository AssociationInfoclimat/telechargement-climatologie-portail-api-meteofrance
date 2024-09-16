import {
    getStartOfHourDateCommande,
    HourCommande,
} from '@/commandes/commande-station/periode-commande/createHourPeriodeCommande.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface HoursCommande {
    debut: HourCommande;
    fin: HourCommande;
}

export function createHoursPeriodeCommande(hoursCommande: HoursCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfHourDateCommande(hoursCommande.debut),
        fin: getStartOfHourDateCommande(hoursCommande.fin),
    });
}
