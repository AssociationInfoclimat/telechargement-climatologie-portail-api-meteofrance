import { NumeroPosteSchema, parseCSV, ParseError, ParseResult, PositiveFloatSchema } from '@/csv/parseCSVUtils.js';
import { createTransform } from '@/lib/createTransform.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    const mn = date.slice('YYYYMMDDHH'.length, 'YYYYMMDDHHMN'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:${mn}:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

const infrahoraireLineSchema = z.object({
    POSTE: NumeroPosteSchema,
    DATE: DateSchema,
    RR6: PositiveFloatSchema,
});
export type InfrahoraireLine = z.infer<typeof infrahoraireLineSchema>;

export function parseInfrahoraireCSV(csv: string): ParseResult<InfrahoraireLine, ParseError<unknown>> {
    return parseCSV(csv, infrahoraireLineSchema);
}
