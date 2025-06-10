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
    const offset = new Date(now.getTime() - 12 * 60 * 1000);
    return createHoraireDate({
        year: offset.getUTCFullYear(),
        month: offset.getUTCMonth() + 1,
        day: offset.getUTCDate(),
        hour: offset.getUTCHours(),
    });
}
