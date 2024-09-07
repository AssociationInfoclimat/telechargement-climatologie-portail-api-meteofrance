import { DateCommande } from '@/commandes/commande-station/periode-commande/DateCommande.js';
import { describe, expect, it } from 'vitest';

describe('DateCommande', () => {
    describe('of', () => {
        it('should accept YYYY-MM-DDThh:00:00Z format', () => {
            expect(DateCommande.of('2000-06-15T12:00:00Z').value()).toBe('2000-06-15T12:00:00Z');
        });
        it('should not accept other formats', () => {
            expect(() => DateCommande.of('2000-06-15T12:30:45Z')).toThrow();
            expect(() => DateCommande.of('2000-06-15T12:00:00')).toThrow();
            expect(() => DateCommande.of('2000-06-15 12:00:00')).toThrow();
        });
    });
    describe('from', () => {
        it('should accept a date with no minutes nor seconds', () => {
            expect(DateCommande.from(new Date('2000-06-15T12:00:00Z')).toDate()).toEqual(
                new Date('2000-06-15T12:00:00Z')
            );
        });
        it('should not accept a date with minutes or seconds', () => {
            expect(() => DateCommande.from(new Date('2000-06-15T12:30:45Z'))).toThrow();
            expect(() => DateCommande.from(new Date('2000-06-15T12:30:00Z'))).toThrow();
        });
    });
});
