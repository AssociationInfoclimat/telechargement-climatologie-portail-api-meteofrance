import { convertAPIDataToDTO } from '@/stations/information-station/api/convertAPIDataToDTO.js';
import { InformationStationData } from '@/stations/information-station/api/InformationStationData.js';
import { InformationStationDTO } from '@/stations/information-station/InformationStation.js';
import { describe, expect, it } from 'vitest';

describe('convertAPIDataToDTO', () => {
    it('convert api data to dto', () => {
        const data: InformationStationData = [
            {
                id: 1014002,
                nom: 'ARBENT',
                lieuDit: 'AUX CARROS',
                bassin: 'V251',
                dateDebut: '2003-10-01 00:00:00',
                dateFin: '',
                typesPoste: [
                    {
                        type: 1,
                        dateDebut: '2003-10-01 00:00:00',
                        dateFin: '',
                    },
                ],
                parametres: [
                    {
                        nom: 'AMPLITUDE ENTRE TN ET TX QUOTIDIEN',
                        dateDebut: '2004-03-18 00:00:00',
                        dateFin: '',
                    },
                    {
                        nom: 'DUREE DES PRECIPITATIONS HORAIRE',
                        dateDebut: '2004-10-21 00:00:00',
                        dateFin: '2004-10-27 23:00:00',
                    },
                ],
                producteurs: [
                    {
                        nom: 'METEO-FRANCE',
                        dateDebut: '2003-10-01 00:00:00',
                        dateFin: '',
                    },
                ],
                positions: [
                    {
                        altitude: 534,
                        latitude: 46.278166666666664,
                        longitude: 5.669,
                        dateDebut: '2003-10-01 00:00:00',
                        dateFin: '',
                    },
                ],
            },
        ];
        const dto: InformationStationDTO[] = [
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
        ];
        expect(convertAPIDataToDTO(data)).toEqual(dto);
    });
});
