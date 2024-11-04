import { IdOMM } from '@/id-station/IdOMM.js';
import { IdStation } from '@/id-station/IdStation.js';
import { fetchListeStations } from '@/paquet-obs/liste-stations/api/adapters/fetchListeStations.meteo-france.js';
import { ListeStationsFetcher } from '@/paquet-obs/liste-stations/api/ListeStationsFetcher.js';
import { describe, expect, it } from 'vitest';

describe('fetchListeStations', () => {
    it('should fetch horaire data', async () => {
        const fetcher = new ListeStationsFetcher({ fetchListeStationsAPI: fetchListeStations });
        const { ok, ko } = await fetcher.fetchListeStations();

        expect(Array.isArray(ko)).toBeTruthy();
        expect(ko).toHaveLength(0);

        expect(Array.isArray(ok)).toBeTruthy();
        expect(ok).not.toHaveLength(0);

        const sample = ok[0];
        expect(sample).toEqual({
            Id_station: expect.any(IdStation),
            Id_omm: expect.any(IdOMM),
            Nom_usuel: expect.any(String),
            Latitude: expect.any(Number),
            Longitude: expect.any(Number),
            Altitude: expect.any(Number),
            Date_ouverture: expect.any(Date),
            Pack: expect.any(String),
        });
    });
});
