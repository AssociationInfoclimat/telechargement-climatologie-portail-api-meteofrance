import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface DayCommande {
    year: number;
    month: number;
    day: number;
}

export function getStartOfDayDateCommande(dayCommande: DayCommande): Date {
    return new Date(Date.UTC(dayCommande.year, dayCommande.month - 1, dayCommande.day, 0));
}

export function getEndOfDayDateCommande(dayCommande: DayCommande): Date {
    return new Date(Date.UTC(dayCommande.year, dayCommande.month - 1, dayCommande.day, 23));
}

export function createDayPeriodeCommande(dayCommande: DayCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfDayDateCommande(dayCommande),
        fin: getEndOfDayDateCommande(dayCommande),
    });
}
