import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import {
    toCelcius,
    toEtat,
    toHPa,
    toHumiditeRelative,
    toIdStation,
    toPercentage,
    toPositiveFloat,
    toPositiveInteger,
    toWindDirection,
} from '@/produits-obs/station/validations/transforms.js';
import { z, ZodError } from 'zod';

export function buildInfrahoraireLineSchema(onCatch: (ctx: { error: ZodError; input: unknown }) => void) {
    return z.object({
        // Mnémotechnique,Descriptif,Type,Unité / Format
        // geo_id_insee,ID of the point as defined by the INSEE number,TEXT,ddnnnpp with dd = department number, nnn = number of the municipality (ddnnn = Insee code), pp = accuracy on site
        geo_id_insee: z.string().transform(toIdStation),
        // lat,latitude in degrees,REAL,deg (plane angle)
        lat: z.number(),
        // lon,longitude in degrees,REAL,deg (plane angle)
        lon: z.number(),
        // reference_time,date and time of the production of the data in UTC,TEXT,iso8601/utc
        reference_time: z.string().transform(date => new Date(date)),
        // insert_time,date and time of data-base insertion of the data in UTC,TEXT,iso8601/utc
        insert_time: z.string().transform(date => new Date(date)),
        // validity_time,date and time of validity of the data in UTC,TEXT,iso8601/utc
        validity_time: z.string().transform(date => new Date(date)),
        // t,air temperature at 2 meters above the ground in Kelvin degrees,REAL,K
        t: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // td,air temperature of dew point at 2 meters above the ground in Kelvin degrees,REAL,K
        // NOT IN THE DOCUMENTATION !!!!!!!!!
        td: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // u,hourly relative humidity at 2 meters,INTEGER,percent
        u: z
            .number()
            .nullish()
            .transform(toHumiditeRelative)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // dd,mean wind direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
        dd: z
            .number()
            .nullish()
            .transform(toWindDirection)
            .catch(ctx => {
                onCatch(ctx);
                return WindDirection.of(PositiveInteger.of(null));
            }),
        // ff,mean wind speed at 10 meters above the ground in m/s,REAL,m/s
        ff: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // dxi10,10 minutes mean wind gust direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
        dxi10: z
            .number()
            .nullish()
            .transform(toWindDirection)
            .catch(ctx => {
                onCatch(ctx);
                return WindDirection.of(PositiveInteger.of(null));
            }),
        // fxi10,10 minutes mean wind gust speed at 10 meters above the ground in m/s,REAL,m/s
        fxi10: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // rr_per,all precipitation over the previous 6 minutes in mm,REAL,mm
        rr_per: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // t_10,temperature at 10 centimeters below the ground in Kelvin degrees,REAL,K
        t_10: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // t_20,temperature at 20 centimeters below the ground in Kelvin degrees,REAL,K
        t_20: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // t_50,temperature at 50 centimeters below the ground in Kelvin degrees,REAL,K
        t_50: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // t_100,temperature at 1 meter below the ground in Kelvin degrees,REAL,K
        t_100: z
            .number()
            .nullish()
            .transform(toCelcius)
            .catch(ctx => {
                onCatch(ctx);
                return null;
            }),
        // vv,horizontal visibility in meters,INTEGER,m
        vv: z
            .number()
            .nullish()
            .transform(toPositiveInteger)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // etat_sol,ground state code,INTEGER,
        etat_sol: z
            .number()
            .nullish()
            .transform(toEtat)
            .catch(ctx => {
                onCatch(ctx);
                return Etat.of(PositiveInteger.of(null));
            }),
        // sss,total depth of snow cover in meters,REAL,m
        sss: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // n,total nebulosity in octas,INTEGER,percent
        n: z
            .number()
            .nullish()
            .transform(toPercentage)
            .catch(ctx => {
                onCatch(ctx);
                return Percentage.of(PositiveInteger.of(null));
            }),
        // insolh,sunshine duration over the previous 1H,REAL,mn
        insolh: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // ray_glo01,global radiation over the previous 6 minutes in J/m2,REAL,J/m2
        ray_glo01: z
            .number()
            .nullish()
            .transform(toPositiveFloat)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // pres,station pressure in Pa,REAL,Pa
        pres: z
            .number()
            .nullish()
            .transform(toHPa)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
        // pmer,sea level pressure in Pa,REAL,Pa
        pmer: z
            .number()
            .nullish()
            .transform(toHPa)
            .catch(ctx => {
                onCatch(ctx);
                return PositiveFloat.of(null);
            }),
    });
}

export type InfrahoraireLineSchema = ReturnType<typeof buildInfrahoraireLineSchema>;
export type InfrahoraireLine = z.TypeOf<InfrahoraireLineSchema>;
