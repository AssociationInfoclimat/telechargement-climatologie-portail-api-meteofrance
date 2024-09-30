import { ParseError, parseNumeroPoste, parsePositiveFloat, ParseResult } from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';
import { z, ZodError } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    const mn = date.slice('YYYYMMDDHH'.length, 'YYYYMMDDHHMN'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:${mn}:00Z`);
}

const infrahoraireLineSchema = z.object({
    POSTE: z.string().transform(parseNumeroPoste),
    DATE: z.string().transform(parseDate),
    RR6: z.string().transform(parsePositiveFloat),
});
export type InfrahoraireLine = ReturnType<typeof infrahoraireLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(infrahoraireLineSchema.shape).map(key => [key, z.number()]))
);
export type InfrahoraireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): InfrahoraireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: InfrahoraireHeaders): InfrahoraireLine {
    const values = line.split(';').map(value => value.trim());
    return infrahoraireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseCSV(csv: string): ParseResult<InfrahoraireLine, ParseError<unknown>> {
    const lines = csv.split(/\r?\n|\r\n?/g);
    const headers = lines.shift();
    if (!headers) {
        throw new Error(`${lines} is not a valid CSV`);
    }
    const headersNameToIndex = parseHeaders(headers);
    const parsed: InfrahoraireLine[] = [];
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
