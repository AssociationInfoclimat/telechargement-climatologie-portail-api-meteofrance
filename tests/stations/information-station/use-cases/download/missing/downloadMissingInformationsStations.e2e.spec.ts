import { fetchInformationStation } from '@/stations/information-station/api/adapters/meteofrance/fetchInformationStation.js';
import { PrismaInformationsStationsRepository } from '@/stations/information-station/db/adapters/prisma/PrismaInformationsStationsRepository.js';
import { InformationsStations, InformationStationDTO } from '@/stations/information-station/InformationStation.js';
import { downloadMissingInformationsStations } from '@/stations/information-station/use-cases/download/downloadMissingInformationsStations.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadMissingInformationsStations', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.station.deleteMany();
        await prisma.informationStation.deleteMany();
    });
    it('should download missing stations informations', async () => {
        const rouenDTO: StationDTO = {
            id: '76116001',
            nom: 'ROUEN-BOOS',
            departement: 76,
            frequence: 'horaire',
            posteOuvert: true,
            typePoste: 0,
            lon: 1.178333,
            lat: 49.3895,
            alt: 156,
            postePublic: true,
        };
        const bouellesDTO: StationDTO = {
            id: '76130001',
            nom: 'BOUELLES',
            departement: 76,
            frequence: 'infrahoraire-6m',
            posteOuvert: true,
            typePoste: 1,
            lon: 1.5025,
            lat: 49.733167,
            alt: 232,
            postePublic: true,
        };
        const rouenInformationsDTO: InformationStationDTO = {
            id: '76116001',
            nom: 'BOOS (ROUEN-BOOS)',
            lieuDit: 'AEROD.ROUEN BOOS',
            bassin: 'H326',
            dateDebut: new Date('1968-03-01T00:00:00Z'),
            dateFin: null,
            typesPoste: [
                {
                    type: 0,
                    dateDebut: new Date('1968-03-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
            parametres: [
                {
                    nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                    dateDebut: new Date('1968-03-01T00:00:00Z'),
                    dateFin: null,
                },
                {
                    nom: 'BASE DE LA 1ERE COUCHE NUAGEUSE',
                    dateDebut: new Date('1987-01-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
            producteurs: [
                {
                    nom: 'METEO-FRANCE',
                    dateDebut: new Date('1968-03-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
            positions: [
                {
                    altitude: 151,
                    latitude: 49.383,
                    longitude: 1.1816666666666666,
                    dateDebut: new Date('1968-03-01T00:00:00Z'),
                    dateFin: new Date('2022-01-03T00:00:00Z'),
                },
                {
                    altitude: 156,
                    latitude: 49.3895,
                    longitude: 1.1783333333333332,
                    dateDebut: new Date('2022-01-04T00:00:00Z'),
                    dateFin: null,
                },
            ],
        };

        const stationsRepository = new PrismaStationsRepository(prisma);
        await stationsRepository.upsertMany(Stations.of([rouenDTO, bouellesDTO]));

        const informationsStationsRepository = new PrismaInformationsStationsRepository(prisma);
        await informationsStationsRepository.upsert(InformationsStations.of([rouenInformationsDTO]));

        await downloadMissingInformationsStations({
            stationsRepository,
            informationStationAPIFetcher: fetchInformationStation,
            informationsStationsRepository,
        });
        const inserted = await informationsStationsRepository.selectAll();
        expect(inserted.get()).toHaveLength(2);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
