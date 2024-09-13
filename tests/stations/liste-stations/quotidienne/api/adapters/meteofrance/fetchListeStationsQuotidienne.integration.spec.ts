import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { fetchListeStationsQuotidienne } from '@/stations/liste-stations/quotidienne/api/adapters/meteofrance/fetchListeStationsQuotidienne.js';
import { describe, expect, it } from 'vitest';

describe('ListeStationsQuotidienneFetcher', () => {
    it('should fetch the list of stations with quotidienne data', async () => {
        const fetcher = new ListeStationsFetcher({ listeStationsAPIFetcher: fetchListeStationsQuotidienne });
        const list = await fetcher.fetchListeStations({
            frequence: DataFrequency.of('quotidienne'),
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
