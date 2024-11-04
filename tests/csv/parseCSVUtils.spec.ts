import {
    parseCodeQualite,
    parseDecade,
    parseFloatOrNull,
    parseInteger,
    parseIntegerOrNull,
    parseJour,
    parseNbJours,
    parseNomUsuel,
    parseNumeroPoste,
    parseOcta,
    parsePercentage,
    parsePositiveFloat,
    parsePositiveInteger,
    parseTime,
    parseUVIndex,
    parseWindDirection,
} from '@/csv/parseCSVUtils.js';
import { InvalidDecadeError } from '@/data/value-objects/Decade.js';
import { InvalidPositiveIntegerError } from '@/data/value-objects/PositiveInteger.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('parseCSVUtils', () => {
    describe('parseNumeroPoste', () => {
        it('should parse a IdStation value object from a string', () => {
            expect(parseNumeroPoste('01014002')).toEqual(IdStation.of('01014002'));
        });
    });

    describe('parseNomUsuel', () => {
        it('should parse a poste name from a string', () => {
            expect(parseNomUsuel('ARBENT')).toEqual('ARBENT');
        });
    });

    describe('parseInteger', () => {
        it('should parse an integer from a string', () => {
            expect(parseInteger('123')).toEqual(123);
        });
    });

    describe('parseIntegerOrNull', () => {
        it('should parse an integer from a string', () => {
            expect(parseIntegerOrNull('123')).toEqual(123);
        });
        it('should return null if the string is empty', () => {
            expect(parseIntegerOrNull('')).toBeNull();
        });
    });

    describe('parseFloatOrNull', () => {
        it('should parse a float from a string', () => {
            expect(parseFloatOrNull('123.45')).toEqual(123.45);
        });
        it('should return null if the string is empty', () => {
            expect(parseFloatOrNull('')).toBeNull();
        });
    });

    describe('parsePositiveInteger', () => {
        it('should parse a positive integer value object from a string', () => {
            expect(parsePositiveInteger('123').value()).toEqual(123);
        });
        it('should return a null positive number value object if the string is empty', () => {
            expect(parsePositiveInteger('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parsePositiveInteger('123.45')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parsePositiveFloat', () => {
        it('should parse a positive float value object from a string', () => {
            expect(parsePositiveFloat('123.45').value()).toEqual(123.45);
        });
        it('should return a null positive number value object if the string is empty', () => {
            expect(parsePositiveFloat('').value()).toEqual(null);
        });
    });

    describe('parseCodeQualite', () => {
        it('should parse a code qualité value object from a string', () => {
            expect(parseCodeQualite('9').value()).toEqual(9);
        });
        it('should return a null code qualité value object if the string is empty', () => {
            expect(parseCodeQualite('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseCodeQualite('0.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseTime', () => {
        it('should parse a time value object from a string', () => {
            expect(parseTime('1230').value()).toEqual('1230');
            expect(parseTime('5').value()).toEqual('0005');
        });
        it('should return a null time value object if the string is empty', () => {
            expect(parseTime('').value()).toEqual(null);
        });
    });

    describe('parsePercentage', () => {
        it('should parse a percentage value object from a string', () => {
            expect(parsePercentage('100').value()).toEqual(100);
        });
        it('should return a null percentage value object if the string is empty', () => {
            expect(parsePercentage('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parsePercentage('50.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseOcta', () => {
        it('should parse an octa value object from a string', () => {
            expect(parseOcta('8').value()).toEqual(8);
        });
        it('should return a null octa value object if the string is empty', () => {
            expect(parseOcta('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseOcta('8.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseUVIndex', () => {
        it('should parse a UV index value object from a string', () => {
            expect(parseUVIndex('12').value()).toEqual(12);
        });
        it('should return a null UV index value object if the string is empty', () => {
            expect(parseUVIndex('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseUVIndex('5.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseWindDirection', () => {
        it('should parse a wind direction value object from a string', () => {
            expect(parseWindDirection('360').value()).toEqual(0);
        });
        it('should return a null wind direction value object if the string is empty', () => {
            expect(parseWindDirection('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseWindDirection('0.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseNbJours', () => {
        it('should parse a number of days value object from a string', () => {
            expect(parseNbJours('31').value()).toEqual(31);
        });
        it('should return a null number of days value object if the string is empty', () => {
            expect(parseNbJours('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseNbJours('5.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseJour', () => {
        it('should parse a day value object from a string', () => {
            expect(parseJour('31').value()).toEqual(31);
        });
        it('should return a null day value object if the string is empty', () => {
            expect(parseJour('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseJour('5.5')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parseDecade', () => {
        it('should parse a decade value object from a string', () => {
            expect(parseDecade('3').value()).toEqual(3);
        });
        it('should not accept an empty string', () => {
            expect(() => parseDecade('')).toThrow(InvalidDecadeError);
        });
        it('should not accept a float', () => {
            expect(() => parseDecade('5.5')).toThrow(InvalidPositiveIntegerError);
        });
    });
});
