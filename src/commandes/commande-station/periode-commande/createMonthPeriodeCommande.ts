import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface MonthCommande {
    year: number;
    month: number;
}

export function getStartOfMonthDateCommande(monthCommande: MonthCommande): Date {
    return new Date(Date.UTC(monthCommande.year, monthCommande.month - 1, 1, 0));
}

export function getEndOfMonthDateCommande(monthCommande: MonthCommande): Date {
    return new Date(Date.UTC(monthCommande.year, monthCommande.month, 0, 23));
}

export function createMonthPeriodeCommande(monthCommande: MonthCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfMonthDateCommande(monthCommande),
        fin: getEndOfMonthDateCommande(monthCommande),
    });
}
