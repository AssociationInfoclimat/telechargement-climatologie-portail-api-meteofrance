import { CodeSynop } from '@/csv/horaires/value-objects/CodeSynop.js';
import { CodeTemps } from '@/csv/horaires/value-objects/CodeTemps.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HouleDirection } from '@/csv/horaires/value-objects/HouleDirection.js';
import { Visibility } from '@/csv/horaires/value-objects/Visibility.js';
import {
    FloatOrNullSchema,
    HumiditeRelativeSchema,
    NumeroPosteSchema,
    OctaSchema,
    onCatch,
    parseCSV,
    ParseError,
    parsePositiveInteger,
    ParseResult,
    PositiveFloatSchema,
    PositiveIntegerSchema,
    TimeSchema,
    UVIndexSchema,
    WindDirectionSchema,
} from '@/csv/parseCSVUtils.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { createTransform } from '@/lib/createTransform.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

export function parseCodeSynop(value: string): CodeSynop {
    return CodeSynop.of(value);
}

export const toCodeSynop = createTransform(parseCodeSynop);
export const CodeSynopSchema = z
    .string()
    .transform(toCodeSynop)
    .catch(ctx => {
        onCatch(ctx);
        return CodeSynop.of('');
    });

export function parseCodeTemps(value: string): CodeTemps {
    return CodeTemps.of(value);
}

export const toCodeTemps = createTransform(parseCodeTemps);
export const CodeTempsSchema = z
    .string()
    .transform(toCodeTemps)
    .catch(ctx => {
        onCatch(ctx);
        return CodeTemps.of('');
    });

export function parseEtat(value: string): Etat {
    return Etat.of(parsePositiveInteger(value));
}

export const toEtat = createTransform(parseEtat);
export const EtatSchema = z
    .string()
    .transform(toEtat)
    .catch(ctx => {
        onCatch(ctx);
        return Etat.of(PositiveInteger.of(null));
    });

export function parseVisibility(value: string): Visibility {
    return Visibility.of(parsePositiveInteger(value));
}

export const toVisibility = createTransform(parseVisibility);
export const VisibilitySchema = z
    .string()
    .transform(toVisibility)
    .catch(ctx => {
        onCatch(ctx);
        return Visibility.of(PositiveInteger.of(null));
    });

export function parseHouleDirection(value: string): HouleDirection {
    return HouleDirection.of(parsePositiveInteger(value));
}

export const toHouleDirection = createTransform(parseHouleDirection);
export const HouleDirectionSchema = z
    .string()
    .transform(toHouleDirection)
    .catch(ctx => {
        onCatch(ctx);
        return HouleDirection.of(PositiveInteger.of(null));
    });

const horaireLineSchema = z.object({
    POSTE: NumeroPosteSchema,
    DATE: DateSchema,
    RR1: PositiveFloatSchema, // 3.3
    DRR1: PositiveIntegerSchema, // 4
    HNEIGEF: PositiveIntegerSchema, // 4
    NEIGETOT: PositiveIntegerSchema, // 4
    T: FloatOrNullSchema, // -5.5
    TD: FloatOrNullSchema, // -5.5
    TN: FloatOrNullSchema, // -5.5
    HTN: TimeSchema, // 1230
    TX: FloatOrNullSchema, // -5.5
    HTX: TimeSchema, // 1230
    DG: PositiveIntegerSchema, // 4
    T10: FloatOrNullSchema, // -5.5
    T20: FloatOrNullSchema, // -5.5
    T50: FloatOrNullSchema, // -5.5
    T100: FloatOrNullSchema, // -5.5
    TNSOL: FloatOrNullSchema, // -5.5
    TN50: FloatOrNullSchema, // -5.5
    TCHAUSSEE: FloatOrNullSchema, // -5.5
    TW: FloatOrNullSchema, // -5.5
    PSTAT: PositiveFloatSchema, // 3.3
    PMER: PositiveFloatSchema, // 3.3
    GEOP: PositiveIntegerSchema, // 4
    PMERMIN: PositiveFloatSchema, // 3.3
    FF: PositiveFloatSchema, // 3.3
    DD: WindDirectionSchema, // 360
    FXI: PositiveFloatSchema, // 3.3
    DXI: WindDirectionSchema, // 360
    HXI: TimeSchema, // 1230
    FXY: PositiveFloatSchema, // 3.3
    DXY: WindDirectionSchema, // 360
    HXY: TimeSchema, // 1230
    FF2: PositiveFloatSchema, // 3.3
    DD2: WindDirectionSchema, // 360
    FXI2: PositiveFloatSchema, // 3.3
    DXI2: WindDirectionSchema, // 360
    HXI2: TimeSchema, // 1230
    FXI3S: PositiveFloatSchema, // 3.3
    DXI3S: WindDirectionSchema, // 360
    HXI3S: TimeSchema, // 1230
    U: HumiditeRelativeSchema, // 100
    UN: HumiditeRelativeSchema, // 100
    HUN: TimeSchema, // 1230
    UX: HumiditeRelativeSchema, // 100
    HUX: TimeSchema, // 1230
    UABS: PositiveFloatSchema, // 3.3
    DHUMI40: PositiveIntegerSchema, // 4
    DHUMI80: PositiveIntegerSchema, // 4
    DHUMEC: PositiveIntegerSchema, // 4
    TSV: PositiveFloatSchema, // 3.3
    ENTH: PositiveFloatSchema, // 3.3
    INS: PositiveIntegerSchema, // 4
    GLO: PositiveIntegerSchema, // 4
    DIR: PositiveIntegerSchema, // 4
    DIF: PositiveIntegerSchema, // 4
    GLO2: PositiveIntegerSchema, // 4
    UV: PositiveIntegerSchema, // 4
    INFRAR: PositiveIntegerSchema, // 4
    UV_INDICE: UVIndexSchema, // 12
    N: OctaSchema, // 8
    NBAS: OctaSchema, // 8
    CL: CodeSynopSchema, // /
    CM: CodeSynopSchema, // /
    CH: CodeSynopSchema, // /
    N1: OctaSchema, // 8
    C1: CodeSynopSchema, // /
    B1: PositiveIntegerSchema, // 4
    N2: OctaSchema, // 8
    C2: CodeSynopSchema, // /
    B2: PositiveIntegerSchema, // 4
    N3: OctaSchema, // 8
    B3: PositiveIntegerSchema, // 4
    C3: CodeSynopSchema, // /
    N4: OctaSchema, // 8
    C4: CodeSynopSchema, // /
    B4: PositiveIntegerSchema, // 4
    WW: CodeTempsSchema, // 00
    VV: PositiveIntegerSchema, // 4
    DVV200: PositiveIntegerSchema, // 4
    W1: CodeTempsSchema, // 00
    W2: CodeTempsSchema, // 00
    SOL: EtatSchema, // 7
    SOLNG: EtatSchema, // 7
    TSNEIGE: PositiveFloatSchema, // 3.3
    TUBENEIGE: PositiveIntegerSchema, // 4
    ESNEIGE: EtatSchema, // 7
    HNEIGEFI3: PositiveIntegerSchema, // 4
    HNEIGEFI1: PositiveIntegerSchema, // 4
    TMER: FloatOrNullSchema, // -5.5
    VVMER: VisibilitySchema, // 6
    ETATMER: EtatSchema, // 7
    DIRHOULE: HouleDirectionSchema, // 999
    TLAGON: FloatOrNullSchema, // -5.5
    UV2: PositiveIntegerSchema, // 4
    INS2: PositiveIntegerSchema, // 4
    INFRAR2: PositiveIntegerSchema, // 4
    DIR2: PositiveIntegerSchema, // 4
    DIF2: PositiveIntegerSchema, // 4
});
export type HoraireLine = z.infer<typeof horaireLineSchema>;

export function parseHoraireCSV(csv: string): ParseResult<HoraireLine, ParseError<unknown>> {
    return parseCSV(csv, horaireLineSchema);
}
