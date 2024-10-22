import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { parseNumeroPoste } from '@/csv/parseCSVUtils.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { createTransform } from '@/lib/createTransform.js';

export const toIdStation = createTransform(parseNumeroPoste);
export const toPositiveInteger = createTransform((value: number | null | undefined) =>
    PositiveInteger.of(value ?? null)
);
export const toPositiveFloat = createTransform((value: number | null | undefined) => PositiveFloat.of(value ?? null));
export const toCelcius = createTransform((kelvin: number | null | undefined) => {
    const value = PositiveFloat.of(kelvin ?? null).value();
    return value !== null ? +(value - 273.15).toFixed(2) : null;
});
export const toHPa = createTransform((value: number | null | undefined) =>
    PositiveFloat.of(value !== null && value !== undefined ? value / 100 : null)
);
export const toHumiditeRelative = createTransform((value: number | null | undefined) =>
    HumiditeRelative.of(value ?? null)
);
export const toPercentage = createTransform((value: number | null | undefined) =>
    Percentage.of(PositiveInteger.of(value ?? null))
);
export const toWindDirection = createTransform((value: number | null | undefined) =>
    WindDirection.of(PositiveInteger.of(value ?? null))
);
export const toEtat = createTransform((value: number | null | undefined) => Etat.of(PositiveInteger.of(value ?? null)));
