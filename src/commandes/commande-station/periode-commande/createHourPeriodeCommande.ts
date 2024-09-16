import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';

export interface HourCommande {
    year: number;
    month: number;
    day: number;
    hour: number;
}

export function getStartOfHourDateCommande(hourCommande: HourCommande): Date {
    return new Date(Date.UTC(hourCommande.year, hourCommande.month - 1, hourCommande.day, hourCommande.hour, 0, 0, 0));
}

export function createHourPeriodeCommande(hourCommande: HourCommande): PeriodeCommande {
    return PeriodeCommande.from({
        debut: getStartOfHourDateCommande(hourCommande),
        fin: getStartOfHourDateCommande(hourCommande),
    });
}
