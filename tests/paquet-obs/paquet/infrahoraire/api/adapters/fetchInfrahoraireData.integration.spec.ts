import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';
import { fetchInfrahoraireData } from '@/paquet-obs/paquet/infrahoraire/api/adapters/fetchInfrahoraireData.meteo-france.js';
import { InfrahoraireDataFetcher } from '@/paquet-obs/paquet/infrahoraire/api/InfrahoraireDataFetcher.js';
import { describe, expect, it } from 'vitest';

describe('fetchInfrahoraireData', () => {
    it('should fetch horaire data', async () => {
        const fetcher = new InfrahoraireDataFetcher({ fetchInfrahoraireDataAPI: fetchInfrahoraireData });
        const infrahoraireData = await fetcher.fetchInfrahoraireData(IdStation.of('76116001'));
        expect(Array.isArray(infrahoraireData)).toBeTruthy();
        expect(infrahoraireData).not.toHaveLength(0);
        const data = infrahoraireData[0];
        expect(data).toEqual({
            geo_id_insee: expect.any(IdStation),
            lat: expect.any(Number),
            lon: expect.any(Number),
            reference_time: expect.any(Date),
            insert_time: expect.any(Date),
            validity_time: expect.any(Date),
            t: expect.nullOrAny(Number),
            td: expect.nullOrAny(Number),
            u: expect.nullOrAny(HumiditeRelative),
            dd: expect.nullOrAny(WindDirection),
            ff: expect.nullOrAny(PositiveFloat),
            dxi10: expect.nullOrAny(WindDirection),
            fxi10: expect.nullOrAny(PositiveFloat),
            rr_per: expect.nullOrAny(PositiveFloat),
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
