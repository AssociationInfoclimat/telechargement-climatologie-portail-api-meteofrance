import { InMemoryListeStationsRepository } from '@/paquet-obs/liste-stations/db/adapters/ListeStationsRepository.in-memory.js';
import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';
import { describe, expect, it } from 'vitest';

describe('InMemoryListeStationsRepository', () => {
    describe('upsertMany', () => {
        it('should upsert liste stations', async () => {
            const dataToInsert: ListeStationLineDTO[] = [
                {
                    Id_station: '01014002',
                    Id_omm: '',
                    Nom_usuel: 'ARBENT',
                    Latitude: 46.278167,
                    Longitude: 5.669,
                    Altitude: 534,
                    Date_ouverture: new Date('2003-10-01T00:00:00Z'),
                    Pack: 'RADOME',
                },
                {
                    Id_station: '01089001',
                    Id_omm: '07482',
                    Nom_usuel: 'AMBERIEU',
                    Latitude: 45.9765,
                    Longitude: 5.329333,
                    Altitude: 250,
                    Date_ouverture: new Date('1934-03-01T00:00:00Z'),
                    Pack: 'RADOME',
                },
            ];
            const repository = new InMemoryListeStationsRepository();
            await repository.upsertMany(dataToInsert);
            await repository.upsertMany(dataToInsert);

            const insertedStations = await repository.selectAll();
            expect(insertedStations).toEqual(dataToInsert);
        });
    });
});
