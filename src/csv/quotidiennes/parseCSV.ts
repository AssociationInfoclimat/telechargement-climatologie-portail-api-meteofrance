import {
    FloatOrNullSchema,
    HumiditeRelativeSchema,
    NumeroPosteSchema,
    OctaSchema,
    onCatch,
    parseCSV,
    ParseError,
    ParseResult,
    PositiveFloatSchema,
    PositiveIntegerSchema,
    RelativePercentageSchema,
    TimeSchema,
    UVIndexSchema,
    WindDirectionSchema,
} from '@/csv/parseCSVUtils.js';
import { createTransform } from '@/lib/createTransform.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    return new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

export function parseBooleanOrNull(value: string): boolean | null {
    switch (value) {
        case '0':
            return false;
        case '1':
            return true;
        case '':
            return null;
        default:
            throw new Error(`Invalid boolean value: '${value}'`);
    }
}

export const toBooleanOrNull = createTransform(parseBooleanOrNull);
export const BooleanOrNullSchema = z
    .string()
    .transform(toBooleanOrNull)
    .catch(ctx => {
        onCatch(ctx);
        return null;
    });

const quotidienneLineSchema = z.object({
    POSTE: NumeroPosteSchema,
    DATE: DateSchema,
    RR: PositiveFloatSchema, // 2.2
    DRR: PositiveIntegerSchema, // 1
    TN: FloatOrNullSchema, // -3.3
    HTN: TimeSchema, // 1230
    TX: FloatOrNullSchema, // -3.3
    HTX: TimeSchema, // 1230
    TM: FloatOrNullSchema, // -3.3
    TMNX: FloatOrNullSchema, // -3.3
    TNSOL: FloatOrNullSchema, // -3.3
    TN50: FloatOrNullSchema, // -3.3
    DG: PositiveIntegerSchema, // 1
    TAMPLI: PositiveFloatSchema, // 1.1
    TNTXM: FloatOrNullSchema, // -3.3
    PMERM: PositiveFloatSchema, // 2.2
    PMERMIN: PositiveFloatSchema, // 2.2
    FFM: PositiveFloatSchema, // 1.1
    FXI: PositiveFloatSchema, // 1.1
    DXI: WindDirectionSchema, // 360
    HXI: TimeSchema, // 1230
    FXY: PositiveFloatSchema, // 1.1
    DXY: WindDirectionSchema, // 360
    HXY: TimeSchema, // 1230
    FF2M: PositiveFloatSchema, // 1.1
    FXI2: PositiveFloatSchema, // 1.1
    DXI2: WindDirectionSchema, // 360
    HXI2: TimeSchema, // 1230
    FXI3S: PositiveFloatSchema, // 1.1
    DXI3S: WindDirectionSchema, // 360
    HXI3S: TimeSchema, // 1230
    UN: HumiditeRelativeSchema, // 100
    HUN: TimeSchema, // 1230
    UX: HumiditeRelativeSchema, // 100
    HUX: TimeSchema, // 1230
    DHUMI40: PositiveIntegerSchema, // 1
    DHUMI80: PositiveIntegerSchema, // 1
    TSVM: PositiveFloatSchema, // 2.2
    DHUMEC: PositiveIntegerSchema, // 1
    UM: HumiditeRelativeSchema, // 100
    INST: PositiveIntegerSchema, // 1
    GLOT: PositiveIntegerSchema, // 1
    DIFT: PositiveIntegerSchema, // 1
    DIRT: PositiveIntegerSchema, // 1
    SIGMA: RelativePercentageSchema, // 100
    INFRART: PositiveIntegerSchema, // 1
    UV_INDICEX: UVIndexSchema, // 12
    NB300: OctaSchema, // 8
    BA300: PositiveIntegerSchema, // 1
    NEIG: BooleanOrNullSchema, // true
    BROU: BooleanOrNullSchema, // true
    ORAG: BooleanOrNullSchema, // true
    GRESIL: BooleanOrNullSchema, // true
    GRELE: BooleanOrNullSchema, // true
    ROSEE: BooleanOrNullSchema, // true
    VERGLAS: BooleanOrNullSchema, // true
    SOLNEIGE: BooleanOrNullSchema, // true
    GELEE: BooleanOrNullSchema, // true
    FUMEE: BooleanOrNullSchema, // true
    BRUME: BooleanOrNullSchema, // true
    ECLAIR: BooleanOrNullSchema, // true
    ETPMON: PositiveFloatSchema, // 2.2
    ETPGRILLE: PositiveFloatSchema, // 2.2
    UV: UVIndexSchema, // 12
    TMERMAX: FloatOrNullSchema, // -3.3
    TMERMIN: FloatOrNullSchema, // -3.3
    HNEIGEF: PositiveIntegerSchema, // 1
    NEIGETOTX: PositiveIntegerSchema, // 1
    NEIGETOT06: PositiveIntegerSchema, // 1
});
export type QuotidienneLine = z.infer<typeof quotidienneLineSchema>;

export function parseQuotidienneCSV(csv: string): ParseResult<QuotidienneLine, ParseError<unknown>> {
    return parseCSV(csv, quotidienneLineSchema);
}
