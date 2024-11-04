import { InfrahoraireDate } from '@/produits-obs/station/infrahoraire/InfrahoraireDate.js';

export type InfrahoraireMinute = 0 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54;

export interface InfrahourDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: InfrahoraireMinute;
}

export function getStartOfMinuteDate(hourDate: InfrahourDate): Date {
    return new Date(Date.UTC(hourDate.year, hourDate.month - 1, hourDate.day, hourDate.hour, hourDate.minute, 0, 0));
}

export function createInfrahoraireDate(hourCommande: InfrahourDate): InfrahoraireDate {
    return InfrahoraireDate.from(getStartOfMinuteDate(hourCommande));
}

export function getPreviousInfrahoraireMinute(minutes: number): InfrahoraireMinute {
    return (minutes - (minutes % 6)) as InfrahoraireMinute;
}

export function getLastInfrahoraireDate(now: Date): InfrahoraireDate {
    const previousInfrahoraireNow = new Date(now.getTime() - 7 * 60 * 1000);
    return createInfrahoraireDate({
        year: previousInfrahoraireNow.getUTCFullYear(),
        month: previousInfrahoraireNow.getUTCMonth() + 1,
        day: previousInfrahoraireNow.getUTCDate(),
        hour: previousInfrahoraireNow.getUTCHours(),
        minute: getPreviousInfrahoraireMinute(previousInfrahoraireNow.getUTCMinutes()),
    });
}
