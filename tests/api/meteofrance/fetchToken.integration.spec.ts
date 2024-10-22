import { fetchToken } from '@/api/meteofrance/token/fetchToken.js';
import { describe, expect, it } from 'vitest';

describe('fetchToken', () => {
    it('should fetch a new token', async () => {
        const accessToken = await fetchToken();
        expect(accessToken).toEqual(expect.any(String));
        expect(accessToken).not.toHaveLength(0);
    });
});
