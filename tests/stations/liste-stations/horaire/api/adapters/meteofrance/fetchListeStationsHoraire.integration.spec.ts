import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { fetchListeStationsHoraire } from '@/stations/liste-stations/horaire/api/adapters/meteofrance/fetchListeStationsHoraire.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsHoraireFetcher', () => {
    it('should fetch the list of stations with horaire data', async () => {
        const fetcher = new ListeStationsFetcher({ listeStationsAPIFetcher: fetchListeStationsHoraire });
        const list = await fetcher.fetchListeStations({
            frequence: DataFrequency.of('horaire'),
            departement: Departement.of(76),
        });
        expect(Array.isArray(list)).toBeTruthy();
        expect(list).not.toHaveLength(0);
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
    });
});
