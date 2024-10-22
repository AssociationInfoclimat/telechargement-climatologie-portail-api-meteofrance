import { HoraireDate } from '@/produits-obs/station/horaire/HoraireDate.js';

export interface HourDate {
    year: number;
    month: number;
    day: number;
    hour: number;
}

export function getStartOfHourDate(hourDate: HourDate): Date {
    return new Date(Date.UTC(hourDate.year, hourDate.month - 1, hourDate.day, hourDate.hour, 0, 0, 0));
}

export function createHoraireDate(hourCommande: HourDate): HoraireDate {
    return HoraireDate.from(getStartOfHourDate(hourCommande));
}

export function getLastHoraireDate(now: Date): HoraireDate {
    return createHoraireDate({
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
        day: now.getUTCDate(),
        hour: now.getUTCHours(),
    });
}
