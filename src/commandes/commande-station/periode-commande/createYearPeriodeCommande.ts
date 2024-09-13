import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface YearCommande {
    year: number;
    month: number;
}

export function getStartOfYearDateCommande(yearCommande: YearCommande): Date {
    return new Date(Date.UTC(yearCommande.year, 1 - 1, 1, 0));
}

export function getEndOfYearDateCommande(yearCommande: YearCommande): Date {
    return new Date(Date.UTC(yearCommande.year, 12 - 1, 31, 23));
}

export function createYearPeriodeCommande(yearCommande: YearCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfYearDateCommande(yearCommande),
        fin: getEndOfYearDateCommande(yearCommande),
    });
}
