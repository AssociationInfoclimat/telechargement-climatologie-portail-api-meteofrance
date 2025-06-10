import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export function getDepartements(includeAndorre: boolean = true): Departement[] {
    const ids = [];
    for (let i = 1; i <= 95; i++) {
        ids.push(Departement.of(i));
    }
    if (includeAndorre) {
        ids.push(Departement.of(99));
    }
    for (let i = 971; i <= 975; i++) {
        ids.push(Departement.of(i));
    }
    for (let i = 984; i <= 988; i++) {
        ids.push(Departement.of(i));
    }
    return ids;
}
