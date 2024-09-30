import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { Decade } from '@/data/value-objects/Decade.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Integer } from '@/data/value-objects/Integer.js';
import { Jour } from '@/data/value-objects/Jour.js';
import { NbJours } from '@/data/value-objects/NbJours.js';
import { Octa } from '@/data/value-objects/Octa.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { RelativePercentage } from '@/data/value-objects/RelativePercentage.js';
import { Time } from '@/data/value-objects/Time.js';
import { UVIndex } from '@/data/value-objects/UVIndex.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';

export function parseNumeroPoste(numero: string): IdStation {
    return IdStation.of(numero);
}

export function parseNomUsuel(nomUsuel: string): string {
    return nomUsuel;
}

export function parseInteger(value: string): number {
    return parseInt(value, 10);
}

export function parseIntegerOrNull(value: string): number | null {
    return value ? parseInteger(value) : null;
}

export function parseFloatOrNull(value: string): number | null {
    return value ? parseFloat(value.replace(',', '.')) : null;
}

export function parsePositiveInteger(value: string): PositiveInteger {
    return PositiveInteger.of(parseFloatOrNull(value));
}

export function parsePositiveFloat(value: string): PositiveFloat {
    return PositiveFloat.of(parseFloatOrNull(value));
}

export function parseCodeQualite(value: string): CodeQualite {
    return CodeQualite.of(Integer.of(parseFloatOrNull(value)));
}

export function parseTime(value: string): Time {
    return Time.of(value);
}

export function parsePercentage(value: string): Percentage {
    return Percentage.of(parsePositiveInteger(value));
}

export function parseRelativePercentage(value: string): RelativePercentage {
    return RelativePercentage.of(parseFloatOrNull(value));
}

export function parseHumiditeRelative(value: string): HumiditeRelative {
    return HumiditeRelative.of(parseFloatOrNull(value));
}

export function parseOcta(value: string): Octa {
    return Octa.of(parsePositiveInteger(value));
}

export function parseUVIndex(value: string): UVIndex {
    return UVIndex.of(parsePositiveInteger(value));
}

export function parseWindDirection(value: string): WindDirection {
    return WindDirection.of(parsePositiveInteger(value));
}

export function parseNbJours(nbJours: string): NbJours {
    return NbJours.of(parsePositiveInteger(nbJours));
}

export function parseJour(jour: string): Jour {
    return Jour.of(parsePositiveInteger(jour));
}

export function parseDecade(decade: string): Decade {
    return Decade.of(parsePositiveInteger(decade));
}

export class ParseError<T, E extends Error = Error> extends Error {
    public readonly headers: string;
    public readonly line: string;
    public readonly error: E;
    public readonly data?: T;

    constructor({ headers, line, error, data }: { headers: string; line: string; error: E; data?: T }) {
        super(`Error parsing line:
Headers : ${headers}
CSV     : ${line}
`);
        this.headers = headers;
        this.line = line;
        this.error = error;
        this.data = data;
    }
}

export interface ParseResult<T, E extends Error = Error> {
    ok: T[];
    ko: E[];
}
