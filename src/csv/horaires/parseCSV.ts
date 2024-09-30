import { CodeSynop } from '@/csv/horaires/value-objects/CodeSynop.js';
import { CodeTemps } from '@/csv/horaires/value-objects/CodeTemps.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HouleDirection } from '@/csv/horaires/value-objects/HouleDirection.js';
import { Visibility } from '@/csv/horaires/value-objects/Visibility.js';
import {
    ParseError,
    parseFloatOrNull,
    parseHumiditeRelative,
    parseNumeroPoste,
    parseOcta,
    parsePositiveFloat,
    parsePositiveInteger,
    ParseResult,
    parseTime,
    parseUVIndex,
    parseWindDirection,
} from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';
import { z, ZodError } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:00:00Z`);
}

export function parseCodeSynop(value: string): CodeSynop {
    return CodeSynop.of(value);
}

export function parseCodeTemps(value: string): CodeTemps {
    return CodeTemps.of(value);
}

export function parseEtat(value: string): Etat {
    return Etat.of(parsePositiveInteger(value));
}

export function parseVisibility(value: string): Visibility {
    return Visibility.of(parsePositiveInteger(value));
}

export function parseHouleDirection(value: string): HouleDirection {
    return HouleDirection.of(parsePositiveInteger(value));
}

const horaireLineSchema = z.object({
    POSTE: z.string().transform(parseNumeroPoste),
    DATE: z.string().transform(parseDate),
    RR1: z.string().transform(parsePositiveFloat), // 3.3
    DRR1: z.string().transform(parsePositiveInteger), // 4
    HNEIGEF: z.string().transform(parsePositiveInteger), // 4
    NEIGETOT: z.string().transform(parsePositiveInteger), // 4
    T: z.string().transform(parseFloatOrNull), // -5.5
    TD: z.string().transform(parseFloatOrNull), // -5.5
    TN: z.string().transform(parseFloatOrNull), // -5.5
    HTN: z.string().transform(parseTime), // 1230
    TX: z.string().transform(parseFloatOrNull), // -5.5
    HTX: z.string().transform(parseTime), // 1230
    DG: z.string().transform(parsePositiveInteger), // 4
    T10: z.string().transform(parseFloatOrNull), // -5.5
    T20: z.string().transform(parseFloatOrNull), // -5.5
    T50: z.string().transform(parseFloatOrNull), // -5.5
    T100: z.string().transform(parseFloatOrNull), // -5.5
    TNSOL: z.string().transform(parseFloatOrNull), // -5.5
    TN50: z.string().transform(parseFloatOrNull), // -5.5
    TCHAUSSEE: z.string().transform(parseFloatOrNull), // -5.5
    TW: z.string().transform(parseFloatOrNull), // -5.5
    PSTAT: z.string().transform(parsePositiveFloat), // 3.3
    PMER: z.string().transform(parsePositiveFloat), // 3.3
    GEOP: z.string().transform(parsePositiveInteger), // 4
    PMERMIN: z.string().transform(parsePositiveFloat), // 3.3
    FF: z.string().transform(parsePositiveFloat), // 3.3
    DD: z.string().transform(parseWindDirection), // 360
    FXI: z.string().transform(parsePositiveFloat), // 3.3
    DXI: z.string().transform(parseWindDirection), // 360
    HXI: z.string().transform(parseTime), // 1230
    FXY: z.string().transform(parsePositiveFloat), // 3.3
    DXY: z.string().transform(parseWindDirection), // 360
    HXY: z.string().transform(parseTime), // 1230
    FF2: z.string().transform(parsePositiveFloat), // 3.3
    DD2: z.string().transform(parseWindDirection), // 360
    FXI2: z.string().transform(parsePositiveFloat), // 3.3
    DXI2: z.string().transform(parseWindDirection), // 360
    HXI2: z.string().transform(parseTime), // 1230
    FXI3S: z.string().transform(parsePositiveFloat), // 3.3
    DXI3S: z.string().transform(parseWindDirection), // 360
    HXI3S: z.string().transform(parseTime), // 1230
    U: z.string().transform(parseHumiditeRelative), // 100
    UN: z.string().transform(parseHumiditeRelative), // 100
    HUN: z.string().transform(parseTime), // 1230
    UX: z.string().transform(parseHumiditeRelative), // 100
    HUX: z.string().transform(parseTime), // 1230
    UABS: z.string().transform(parsePositiveFloat), // 3.3
    DHUMI40: z.string().transform(parsePositiveInteger), // 4
    DHUMI80: z.string().transform(parsePositiveInteger), // 4
    DHUMEC: z.string().transform(parsePositiveInteger), // 4
    TSV: z.string().transform(parsePositiveFloat), // 3.3
    ENTH: z.string().transform(parsePositiveFloat), // 3.3
    INS: z.string().transform(parsePositiveInteger), // 4
    GLO: z.string().transform(parsePositiveInteger), // 4
    DIR: z.string().transform(parsePositiveInteger), // 4
    DIF: z.string().transform(parsePositiveInteger), // 4
    GLO2: z.string().transform(parsePositiveInteger), // 4
    UV: z.string().transform(parsePositiveInteger), // 4
    INFRAR: z.string().transform(parsePositiveInteger), // 4
    UV_INDICE: z.string().transform(parseUVIndex), // 12
    N: z.string().transform(parseOcta), // 8
    NBAS: z.string().transform(parseOcta), // 8
    CL: z.string().transform(parseCodeSynop), // /
    CM: z.string().transform(parseCodeSynop), // /
    CH: z.string().transform(parseCodeSynop), // /
    N1: z.string().transform(parseOcta), // 8
    C1: z.string().transform(parseCodeSynop), // /
    B1: z.string().transform(parsePositiveInteger), // 4
    N2: z.string().transform(parseOcta), // 8
    C2: z.string().transform(parseCodeSynop), // /
    B2: z.string().transform(parsePositiveInteger), // 4
    N3: z.string().transform(parseOcta), // 8
    B3: z.string().transform(parsePositiveInteger), // 4
    C3: z.string().transform(parseCodeSynop), // /
    N4: z.string().transform(parseOcta), // 8
    C4: z.string().transform(parseCodeSynop), // /
    B4: z.string().transform(parsePositiveInteger), // 4
    WW: z.string().transform(parseCodeTemps), // 00
    VV: z.string().transform(parsePositiveInteger), // 4
    DVV200: z.string().transform(parsePositiveInteger), // 4
    W1: z.string().transform(parseCodeTemps), // 00
    W2: z.string().transform(parseCodeTemps), // 00
    SOL: z.string().transform(parseEtat), // 7
    SOLNG: z.string().transform(parseEtat), // 7
    TSNEIGE: z.string().transform(parsePositiveFloat), // 3.3
    TUBENEIGE: z.string().transform(parsePositiveInteger), // 4
    ESNEIGE: z.string().transform(parseEtat), // 7
    HNEIGEFI3: z.string().transform(parsePositiveInteger), // 4
    HNEIGEFI1: z.string().transform(parsePositiveInteger), // 4
    TMER: z.string().transform(parseFloatOrNull), // -5.5
    VVMER: z.string().transform(parseVisibility), // 6
    ETATMER: z.string().transform(parseEtat), // 7
    DIRHOULE: z.string().transform(parseHouleDirection), // 999
    TLAGON: z.string().transform(parseFloatOrNull), // -5.5
    UV2: z.string().transform(parsePositiveInteger), // 4
    INS2: z.string().transform(parsePositiveInteger), // 4
    INFRAR2: z.string().transform(parsePositiveInteger), // 4
    DIR2: z.string().transform(parsePositiveInteger), // 4
    DIF2: z.string().transform(parsePositiveInteger), // 4
});
export type HoraireLine = ReturnType<typeof horaireLineSchema.parse>;

const headersSchema = z.object(Object.fromEntries(Object.keys(horaireLineSchema.shape).map(key => [key, z.number()])));
export type HoraireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): HoraireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: HoraireHeaders): HoraireLine {
    const values = line.split(';').map(value => value.trim());
    return horaireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseCSV(csv: string): ParseResult<HoraireLine, ParseError<unknown>> {
    const lines = csv.split(/\r?\n|\r\n?/g);
    const headers = lines.shift();
    if (!headers) {
        throw new Error(`${lines} is not a valid CSV`);
    }
    const headersNameToIndex = parseHeaders(headers);
    const parsed: HoraireLine[] = [];
    const errors: ParseError<unknown>[] = [];
    for (const line of lines) {
        if (!line.trim()) {
            continue;
        }
        try {
            parsed.push(parseLine(line, headersNameToIndex));
        } catch (e) {
            if (e instanceof ZodError) {
                errors.push(
                    new ParseError({
                        headers: headers,
                        line,
                        error: e,
                        data: e.issues,
                    })
                );
            } else if (e instanceof ValidationError) {
                errors.push(
                    new ParseError({
                        headers: headers,
                        line,
                        error: e,
                    })
                );
            } else {
                throw e;
            }
        }
    }
    return {
        ok: parsed,
        ko: errors,
    };
}
