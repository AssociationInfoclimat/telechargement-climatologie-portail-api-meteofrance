import {
    ParseError,
    parseFloatOrNull,
    parseHumiditeRelative,
    parseNumeroPoste,
    parseOcta,
    parsePositiveFloat,
    parsePositiveInteger,
    parseRelativePercentage,
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
    return new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
}

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

const quotidienneLineSchema = z.object({
    POSTE: z.string().transform(parseNumeroPoste),
    DATE: z.string().transform(parseDate),
    RR: z.string().transform(parsePositiveFloat), // 2.2
    DRR: z.string().transform(parsePositiveInteger), // 1
    TN: z.string().transform(parseFloatOrNull), // -3.3
    HTN: z.string().transform(parseTime), // 1230
    TX: z.string().transform(parseFloatOrNull), // -3.3
    HTX: z.string().transform(parseTime), // 1230
    TM: z.string().transform(parseFloatOrNull), // -3.3
    TMNX: z.string().transform(parseFloatOrNull), // -3.3
    TNSOL: z.string().transform(parseFloatOrNull), // -3.3
    TN50: z.string().transform(parseFloatOrNull), // -3.3
    DG: z.string().transform(parsePositiveInteger), // 1
    TAMPLI: z.string().transform(parsePositiveFloat), // 1.1
    TNTXM: z.string().transform(parseFloatOrNull), // -3.3
    PMERM: z.string().transform(parsePositiveFloat), // 2.2
    PMERMIN: z.string().transform(parsePositiveFloat), // 2.2
    FFM: z.string().transform(parsePositiveFloat), // 1.1
    FXI: z.string().transform(parsePositiveFloat), // 1.1
    DXI: z.string().transform(parseWindDirection), // 360
    HXI: z.string().transform(parseTime), // 1230
    FXY: z.string().transform(parsePositiveFloat), // 1.1
    DXY: z.string().transform(parseWindDirection), // 360
    HXY: z.string().transform(parseTime), // 1230
    FF2M: z.string().transform(parsePositiveFloat), // 1.1
    FXI2: z.string().transform(parsePositiveFloat), // 1.1
    DXI2: z.string().transform(parseWindDirection), // 360
    HXI2: z.string().transform(parseTime), // 1230
    FXI3S: z.string().transform(parsePositiveFloat), // 1.1
    DXI3S: z.string().transform(parseWindDirection), // 360
    HXI3S: z.string().transform(parseTime), // 1230
    UN: z.string().transform(parseHumiditeRelative), // 100
    HUN: z.string().transform(parseTime), // 1230
    UX: z.string().transform(parseHumiditeRelative), // 100
    HUX: z.string().transform(parseTime), // 1230
    DHUMI40: z.string().transform(parsePositiveInteger), // 1
    DHUMI80: z.string().transform(parsePositiveInteger), // 1
    TSVM: z.string().transform(parsePositiveFloat), // 2.2
    DHUMEC: z.string().transform(parsePositiveInteger), // 1
    UM: z.string().transform(parseHumiditeRelative), // 100
    INST: z.string().transform(parsePositiveInteger), // 1
    GLOT: z.string().transform(parsePositiveInteger), // 1
    DIFT: z.string().transform(parsePositiveInteger), // 1
    DIRT: z.string().transform(parsePositiveInteger), // 1
    SIGMA: z.string().transform(parseRelativePercentage), // 100
    INFRART: z.string().transform(parsePositiveInteger), // 1
    UV_INDICEX: z.string().transform(parseUVIndex), // 12
    NB300: z.string().transform(parseOcta), // 8
    BA300: z.string().transform(parsePositiveInteger), // 1
    NEIG: z.string().transform(parseBooleanOrNull), // true
    BROU: z.string().transform(parseBooleanOrNull), // true
    ORAG: z.string().transform(parseBooleanOrNull), // true
    GRESIL: z.string().transform(parseBooleanOrNull), // true
    GRELE: z.string().transform(parseBooleanOrNull), // true
    ROSEE: z.string().transform(parseBooleanOrNull), // true
    VERGLAS: z.string().transform(parseBooleanOrNull), // true
    SOLNEIGE: z.string().transform(parseBooleanOrNull), // true
    GELEE: z.string().transform(parseBooleanOrNull), // true
    FUMEE: z.string().transform(parseBooleanOrNull), // true
    BRUME: z.string().transform(parseBooleanOrNull), // true
    ECLAIR: z.string().transform(parseBooleanOrNull), // true
    ETPMON: z.string().transform(parsePositiveFloat), // 2.2
    ETPGRILLE: z.string().transform(parsePositiveFloat), // 2.2
    UV: z.string().transform(parseUVIndex), // 12
    TMERMAX: z.string().transform(parseFloatOrNull), // -3.3
    TMERMIN: z.string().transform(parseFloatOrNull), // -3.3
    HNEIGEF: z.string().transform(parsePositiveInteger), // 1
    NEIGETOTX: z.string().transform(parsePositiveInteger), // 1
    NEIGETOT06: z.string().transform(parsePositiveInteger), // 1
});
export type QuotidienneLine = ReturnType<typeof quotidienneLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(quotidienneLineSchema.shape).map(key => [key, z.number()]))
);
export type QuotidienneHeaders = z.infer<typeof headersSchema>;

export function parseHeaders(line: string): QuotidienneHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: QuotidienneHeaders): QuotidienneLine {
    const values = line.split(';').map(value => value.trim());
    return quotidienneLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseCSV(csv: string): ParseResult<QuotidienneLine, ParseError<unknown>> {
    const lines = csv.split(/\r?\n|\r\n?/g);
    const headers = lines.shift();
    if (!headers) {
        throw new Error(`${lines} is not a valid CSV`);
    }
    const headersNameToIndex = parseHeaders(headers);
    const parsed: QuotidienneLine[] = [];
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
