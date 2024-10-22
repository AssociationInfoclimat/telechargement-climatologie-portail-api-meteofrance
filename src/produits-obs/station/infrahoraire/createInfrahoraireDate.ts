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
    const infrahoraireDate = createInfrahoraireDate({
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
        day: now.getUTCDate(),
        hour: now.getUTCHours(),
        minute: getPreviousInfrahoraireMinute(now.getUTCMinutes()),
    });
    const infrahoraireNow = new Date(infrahoraireDate.value());
    const previousInfrahoraireNow = new Date(infrahoraireNow.getTime() - 6 * 60 * 1000);
    return createInfrahoraireDate({
        year: previousInfrahoraireNow.getUTCFullYear(),
        month: previousInfrahoraireNow.getUTCMonth() + 1,
        day: previousInfrahoraireNow.getUTCDate(),
        hour: previousInfrahoraireNow.getUTCHours(),
        minute: previousInfrahoraireNow.getUTCMinutes() as InfrahoraireMinute,
    });
}
