import {
    createInMemoryInformationStationAPIFetcher,
    createSuccessfulAPIResponse,
} from '@/stations/information-station/api/adapters/in-memory/fetchInformationStation.js';
import { InMemoryInformationsStationsRepository } from '@/stations/information-station/db/adapters/in-memory/InMemoryInformationsStationsRepository.js';
import { InformationStationDTO } from '@/stations/information-station/InformationStation.js';
import { downloadAllInformationsStations } from '@/stations/information-station/use-cases/download/downloadAllInformationsStations.js';
import { InMemoryStationsRepository } from '@/stations/liste-stations/db/adapters/in-memory/InMemoryStationsRepository.js';
import { StationDTO } from '@/stations/liste-stations/Station.js';

import { assert, describe, it } from 'vitest';

describe('downloadAllInformationsStations', () => {
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
        const rouenAPI = {
            id: 76116001,
            nom: 'BOOS (ROUEN-BOOS)',
            lieuDit: 'AEROD.ROUEN BOOS',
            bassin: 'H326',
            dateDebut: '1968-03-01 00:00:00',
            dateFin: '',
            typesPoste: [
                {
                    type: 0,
                    dateDebut: '1968-03-01 00:00:00',
                    dateFin: '',
                },
            ],
            parametres: [
                {
                    nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                    dateDebut: '1968-03-01 00:00:00',
                    dateFin: '',
                },
                {
                    nom: 'BASE DE LA 1ERE COUCHE NUAGEUSE',
                    dateDebut: '1987-01-01 00:00:00',
                    dateFin: '',
                },
            ],
            producteurs: [
                {
                    nom: 'METEO-FRANCE',
                    dateDebut: '1968-03-01 00:00:00',
                    dateFin: '',
                },
            ],
            positions: [
                {
                    altitude: 151,
                    latitude: 49.383,
                    longitude: 1.1816666666666666,
                    dateDebut: '1968-03-01 00:00:00',
                    dateFin: '2022-01-03 00:00:00',
                },
                {
                    altitude: 156,
                    latitude: 49.3895,
                    longitude: 1.1783333333333332,
                    dateDebut: '2022-01-04 00:00:00',
                    dateFin: '',
                },
            ],
        };
        const bouellesAPI = {
            id: 76130001,
            nom: 'BOUELLES',
            lieuDit: 'Les Hallais',
            bassin: 'G221',
            dateDebut: '2005-03-01 00:00:00',
            dateFin: '',
            typesPoste: [
                {
                    type: 1,
                    dateDebut: '2005-03-01 00:00:00',
                    dateFin: '',
                },
            ],
            parametres: [
                {
                    nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                    dateDebut: '2005-06-06 00:00:00',
                    dateFin: '',
                },
                {
                    nom: 'MOYENNE DES TM',
                    dateDebut: '2005-06-01 00:00:00',
                    dateFin: '2005-09-01 00:00:00',
                },
            ],
            producteurs: [
                {
                    nom: 'METEO-FRANCE',
                    dateDebut: '2005-03-01 00:00:00',
                    dateFin: '',
                },
            ],
            positions: [
                {
                    altitude: 232,
                    latitude: 49.73316666666667,
                    longitude: 1.5025,
                    dateDebut: '2005-03-01 00:00:00',
                    dateFin: '',
                },
            ],
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
        const bouellesInformationsDTO: InformationStationDTO = {
            id: '76130001',
            nom: 'BOUELLES',
            lieuDit: 'Les Hallais',
            bassin: 'G221',
            dateDebut: new Date('2005-03-01T00:00:00Z'),
            dateFin: null,
            typesPoste: [
                {
                    type: 1,
                    dateDebut: new Date('2005-03-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
            parametres: [
                {
                    nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                    dateDebut: new Date('2005-06-06T00:00:00Z'),
                    dateFin: null,
                },
                {
                    nom: 'MOYENNE DES TM',
                    dateDebut: new Date('2005-06-01T00:00:00Z'),
                    dateFin: new Date('2005-09-01T00:00:00Z'),
                },
            ],
            producteurs: [
                {
                    nom: 'METEO-FRANCE',
                    dateDebut: new Date('2005-03-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
            positions: [
                {
                    altitude: 232,
                    latitude: 49.73316666666667,
                    longitude: 1.5025,
                    dateDebut: new Date('2005-03-01T00:00:00Z'),
                    dateFin: null,
                },
            ],
        };

        const informationsStationsRepository = InMemoryInformationsStationsRepository.of([]);
        await downloadAllInformationsStations({
            stationsRepository: InMemoryStationsRepository.of([rouenDTO, bouellesDTO]),
            informationStationAPIFetcher: createInMemoryInformationStationAPIFetcher({
                '76116001': createSuccessfulAPIResponse([rouenAPI]),
                '76130001': createSuccessfulAPIResponse([bouellesAPI]),
            }),
            informationsStationsRepository,
            throttleInMs: 0,
        });
        const inserted = await informationsStationsRepository.selectAll();
        assert.sameDeepMembers(inserted.toDTOs(), [rouenInformationsDTO, bouellesInformationsDTO]);
    });
});
