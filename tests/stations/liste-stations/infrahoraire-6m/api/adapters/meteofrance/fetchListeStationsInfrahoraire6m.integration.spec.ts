import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { fetchListeStationsInfrahoraire6m } from '@/stations/liste-stations/infrahoraire-6m/api/adapters/meteofrance/fetchListeStationsInfrahoraire6m.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsInfrahoraire6mFetcher', () => {
    it('should fetch the list of stations with infrahoraire 6 minutes data', async () => {
        const fetcher = new ListeStationsFetcher({ listeStationsAPIFetcher: fetchListeStationsInfrahoraire6m });
        const list = await fetcher.fetchListeStations({
            frequence: DataFrequency.of('infrahoraire-6m'),
            departement: Departement.of(76),
        });
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
    });
});
