import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';
import { fetchHoraireData } from '@/produits-obs/station/horaire/api/adapters/fetchHoraireData.meteo-france.js';
import { HoraireDataFetcher } from '@/produits-obs/station/horaire/api/HoraireDataFetcher.js';
import { createHoraireDate } from '@/produits-obs/station/horaire/createHoraireDate.js';
import { describe, expect, it } from 'vitest';

describe('fetchHoraireData', () => {
    it('should fetch horaire data', async () => {
        const fetcher = new HoraireDataFetcher({ fetchHoraireDataAPI: fetchHoraireData });
        const horaireData = await fetcher.fetchHoraireData({
            idStation: IdStation.of('76116001'),
            horaireDate: createHoraireDate({ year: 2000, month: 6, day: 15, hour: 12 }),
        });
        expect(horaireData).toEqual({
            geo_id_insee: expect.any(IdStation),
            lat: expect.any(Number),
            lon: expect.any(Number),
            reference_time: expect.any(Date),
            insert_time: expect.any(Date),
            validity_time: expect.any(Date),
            t: expect.nullOrAny(Number),
            td: expect.nullOrAny(Number),
            tx: expect.nullOrAny(Number),
            tn: expect.nullOrAny(Number),
            u: expect.nullOrAny(HumiditeRelative),
            ux: expect.nullOrAny(HumiditeRelative),
            un: expect.nullOrAny(HumiditeRelative),
            dd: expect.nullOrAny(WindDirection),
            ff: expect.nullOrAny(PositiveFloat),
            dxy: expect.nullOrAny(WindDirection),
            fxy: expect.nullOrAny(PositiveFloat),
            dxi: expect.nullOrAny(WindDirection),
            fxi: expect.nullOrAny(PositiveFloat),
            rr1: expect.nullOrAny(PositiveFloat),
            t_10: expect.nullOrAny(Number),
            t_20: expect.nullOrAny(Number),
            t_50: expect.nullOrAny(Number),
            t_100: expect.nullOrAny(Number),
            vv: expect.nullOrAny(PositiveInteger),
            etat_sol: expect.nullOrAny(Etat),
            sss: expect.nullOrAny(PositiveFloat),
            n: expect.nullOrAny(Percentage),
            insolh: expect.nullOrAny(PositiveFloat),
            ray_glo01: expect.nullOrAny(PositiveFloat),
            pres: expect.nullOrAny(PositiveFloat),
            pmer: expect.nullOrAny(PositiveFloat),
        });
    });
});
