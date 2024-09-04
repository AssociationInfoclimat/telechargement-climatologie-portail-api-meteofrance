import { DateCommande } from '@/commandes/commande-station/periode-commande/DateCommande.js';
import { describe, expect, it } from 'vitest';

describe('DateCommande', () => {
    it('should accept YYYY-MM-DDThh:mm:ssZ format', () => {
        expect(DateCommande.of('2000-06-15T12:00:00Z').value()).toBe('2000-06-15T12:00:00Z');
    });
    it('should not accept other formats', () => {
        expect(() => DateCommande.of('2000-06-15T12:30:45Z')).toThrow();
        expect(() => DateCommande.of('2000-06-15T12:00:00')).toThrow();
        expect(() => DateCommande.of('2000-06-15 12:00:00')).toThrow();
    });
});
