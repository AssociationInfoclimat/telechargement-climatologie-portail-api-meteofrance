import { fetchInformationStation } from '@/stations/information-station/api/adapters/meteofrance/fetchInformationStation.js';
import { PrismaInformationsStationsRepository } from '@/stations/information-station/db/adapters/prisma/PrismaInformationsStationsRepository.js';
import { downloadAllInformationsStations } from '@/stations/information-station/use-cases/download/downloadAllInformationsStations.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { StationDTO, Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('downloadAllInformationsStations', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.station.deleteMany();
        await prisma.informationStation.deleteMany();
    });
    it('should download all stations informations', async () => {
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

        const informationsStationsRepository = new PrismaInformationsStationsRepository(prisma);
        const stationsRepository = new PrismaStationsRepository(prisma);
        await stationsRepository.upsertMany(Stations.of([rouenDTO, bouellesDTO]));
        await downloadAllInformationsStations({
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
