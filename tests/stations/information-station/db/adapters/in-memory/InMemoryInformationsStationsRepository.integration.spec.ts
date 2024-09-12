import { InMemoryInformationsStationsRepository } from '@/stations/information-station/db/adapters/in-memory/InMemoryInformationsStationsRepository.js';
import { InformationsStations } from '@/stations/information-station/InformationStation.js';
import { describe, expect, it } from 'vitest';

describe('InMemoryInformationsStationsRepository', () => {
    it('should insert informations stations', async () => {
        const informationsStationsToInsert: InformationsStations = InformationsStations.of([
            {
                id: '01014002',
                nom: 'ARBENT',
                lieuDit: 'AUX CARROS',
                bassin: 'V251',
                dateDebut: new Date('2003-10-01T00:00:00Z'),
                dateFin: null,
                typesPoste: [
                    {
                        type: 1,
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                parametres: [
                    {
                        nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                        dateDebut: new Date('2004-03-18T00:00:00Z'),
                        dateFin: null,
                    },
                    {
                        nom: 'DUREE DES PRECIPITATIONS HORAIRE',
                        dateDebut: new Date('2004-10-21T00:00:00Z'),
                        dateFin: new Date('2004-10-27T23:00:00Z'),
                    },
                ],
                producteurs: [
                    {
                        nom: 'METEO-FRANCE',
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
                positions: [
                    {
                        altitude: 534,
                        latitude: 46.278166666666664,
                        longitude: 5.669,
                        dateDebut: new Date('2003-10-01T00:00:00Z'),
                        dateFin: null,
                    },
                ],
            },
        ]);
        const repository = InMemoryInformationsStationsRepository.of([]);
        await repository.upsert(informationsStationsToInsert);
        await repository.upsert(informationsStationsToInsert);
        const insertedInformationsStations = await repository.selectAll();
        expect(insertedInformationsStations).toEqual(informationsStationsToInsert);
    });
});
