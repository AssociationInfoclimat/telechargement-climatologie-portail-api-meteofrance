import { createURL } from '@/api/createURL.js';
import { describe, expect, it } from 'vitest';

describe('createURL', () => {
    describe('when no param', () => {
        it('should create a correctly formatted URL', () => {
            expect(createURL('https://example.com')).toBe('https://example.com');
        });
    });
    describe('when one param', () => {
        it('should create a correctly formatted URL', () => {
            expect(createURL('https://example.com', { key: 'value' })).toBe('https://example.com?key=value');
        });
    });
    describe('when multiple params', () => {
        it('should create a correctly formatted URL', () => {
            expect(createURL('https://example.com', { key: 'value', other: 'another' })).toBe(
                'https://example.com?key=value&other=another'
            );
        });
    });
});
