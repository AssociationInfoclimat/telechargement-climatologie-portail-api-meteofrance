import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { ListeStationsHoraireFetcher } from '@/stations/liste-stations/horaire/api/adapters/meteofrance/fetchListeStationsHoraire.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsHoraireFetcher', () => {
    it('should fetch the list of stations with horaire data', async () => {
        try {
            const fetcher = new ListeStationsHoraireFetcher();
            const list = await fetcher.fetchListeStationsHoraire(Departement.of(76));
            expect(Array.isArray(list)).toBeTruthy();
            expect(list.length).toBeGreaterThan(0);
            const station = list[0];
            expect(station).toEqual({
                id: expect.any(String),
                nom: expect.any(String),
                posteOuvert: expect.any(Boolean),
                typePoste: expect.any(Number),
                lon: expect.any(Number),
                lat: expect.any(Number),
                alt: expect.any(Number),
                postePublic: expect.any(Boolean),
            });
        } catch (e) {
            // console as much information of the error as possible
            console.error(e);
            console.error({ e });
            throw e;
        }
    });
});
