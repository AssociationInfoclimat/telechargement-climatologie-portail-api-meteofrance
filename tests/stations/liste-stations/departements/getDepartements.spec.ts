import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { getDepartements } from '@/stations/liste-stations/departements/getDepartements.js';
import { describe, expect, it } from 'vitest';

describe('getIdsDepartements', () => {
    it('should include from 1 to 95', () => {
        const ids = getDepartements();
        expect(ids).toContainEqual(Departement.of(1));
        expect(ids).toContainEqual(Departement.of(95));
    });

    it('should include from 971 to 975', () => {
        const ids = getDepartements();
        expect(ids).toContainEqual(Departement.of(971));
        expect(ids).toContainEqual(Departement.of(975));
    });

    it('should include from 984 to 988', () => {
        const ids = getDepartements();
        expect(ids).toContainEqual(Departement.of(984));
        expect(ids).toContainEqual(Departement.of(988));
    });

    it('should not include anything else', () => {
        const departements = getDepartements();
        const values = departements.map(d => d.value());
        expect(values).not.toContainEqual(0);
        expect(values).not.toContainEqual(96);
        expect(values).not.toContainEqual(970);
        expect(values).not.toContainEqual(976);
        expect(values).not.toContainEqual(983);
        expect(values).not.toContainEqual(989);
    });
});
