import { IdOMM } from '@/id-station/IdOMM.js';
import { IdStation } from '@/id-station/IdStation.js';
import { parseListeStationsCSV } from '@/paquet-obs/liste-stations/csv/parseCSV.js';
import { describe, expect, it } from 'vitest';

describe('parseCSV', () => {
    describe('parseListeStationsCSV', () => {
        it('should parse the CSV', async () => {
            const csv = `Id_station;Id_omm;Nom_usuel;Latitude;Longitude;Altitude;Date_ouverture;Pack
01014002;;ARBENT;46.278167;5.669000;534;2003-10-01;RADOME
01089001;07482;AMBERIEU;45.976500;5.329333;250;1934-03-01;RADOME
`;
            const result = parseListeStationsCSV(csv);
            expect(result).toEqual({
                ok: [
                    {
                        Id_station: IdStation.of('01014002'),
                        Id_omm: IdOMM.of(''),
                        Nom_usuel: 'ARBENT',
                        Latitude: 46.278167,
                        Longitude: 5.669,
                        Altitude: 534,
                        Date_ouverture: new Date('2003-10-01T00:00:00Z'),
                        Pack: 'RADOME',
                    },
                    {
                        Id_station: IdStation.of('01089001'),
                        Id_omm: IdOMM.of('07482'),
                        Nom_usuel: 'AMBERIEU',
                        Latitude: 45.9765,
                        Longitude: 5.329333,
                        Altitude: 250,
                        Date_ouverture: new Date('1934-03-01T00:00:00Z'),
                        Pack: 'RADOME',
                    },
                ],
                ko: [],
            });
        });
    });
});
