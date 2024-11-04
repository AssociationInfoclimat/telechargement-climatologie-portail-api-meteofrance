import { IdOMM } from '@/id-station/IdOMM.js';
import { IdStation } from '@/id-station/IdStation.js';
import { toDTO } from '@/paquet-obs/liste-stations/toDTO.js';
import { describe, expect, it } from 'vitest';

describe('toDTO', () => {
    it('should transform Value Objects to primitives', () => {
        expect(
            toDTO({
                Id_station: IdStation.of('01089001'),
                Id_omm: IdOMM.of('07482'),
                Nom_usuel: 'AMBERIEU',
                Latitude: 45.9765,
                Longitude: 5.329333,
                Altitude: 250,
                Date_ouverture: new Date('1934-03-01T00:00:00Z'),
                Pack: 'RADOME',
            })
        ).toEqual({
            Id_station: '01089001',
            Id_omm: '07482',
            Nom_usuel: 'AMBERIEU',
            Latitude: 45.9765,
            Longitude: 5.329333,
            Altitude: 250,
            Date_ouverture: new Date('1934-03-01T00:00:00Z'),
            Pack: 'RADOME',
        });
    });
});
