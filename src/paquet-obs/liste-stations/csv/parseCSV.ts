import { FloatSchema, IntegerSchema, NomUsuelSchema, parseCSV, ParseError, ParseResult } from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';
import { IdOMM } from '@/id-station/IdOMM.js';
import { IdStation } from '@/id-station/IdStation.js';
import { createTransform } from '@/lib/createTransform.js';
import { Pack } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';
import { z } from 'zod';

export function parseIdStation(numero: string): IdStation {
    return IdStation.of(numero);
}

export const toIdStation = createTransform(parseIdStation);
export const IdStationSchema = z.string().transform(toIdStation);

export function parseIdOMM(numero: string): IdOMM {
    return IdOMM.of(numero);
}

export const toIdOMM = createTransform(parseIdOMM);
export const IdOMMSchema = z.string().transform(toIdOMM);

export function parseDate(date: string): Date {
    return new Date(`${date}T00:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

export class InvalidPackError extends ValidationError {
    constructor(pack: string) {
        super(`Invalid pack : ${pack}. Must be either 'RADOME' or 'ETENDU'`);
    }
}

export function parsePack(pack: string): Pack {
    if (!(pack === 'RADOME' || pack === 'ETENDU')) {
        throw new InvalidPackError(pack);
    }
    return pack;
}

export const toPack = createTransform(parsePack);
export const PackSchema = z.string().transform(toPack);

const listeStationLineSchema = z.object({
    Id_station: IdStationSchema,
    Id_omm: IdOMMSchema,
    Nom_usuel: NomUsuelSchema,
    Latitude: FloatSchema,
    Longitude: FloatSchema,
    Altitude: IntegerSchema,
    Date_ouverture: DateSchema,
    Pack: PackSchema,
});
export type ListeStationLine = z.infer<typeof listeStationLineSchema>;

export function parseListeStationsCSV(csv: string): ParseResult<ListeStationLine, ParseError<unknown>> {
    return parseCSV(csv, listeStationLineSchema);
}

export function createReadingLineDebugMessage(line: ListeStationLine): string {
    return `Reading line : [${line.Id_station}] ${line.Nom_usuel}`;
}
