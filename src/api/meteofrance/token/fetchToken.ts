import { post } from '@/api/api-call.js';
import { Env } from '@/env.js';
import { z } from 'zod';

export async function fetchToken(): Promise<string> {
    const response = await post({
        url: 'https://portail-api.meteofrance.fr/token',
        headers: {
            Authorization: `Basic ${Env.getSingleton().getMeteoFranceApplicationId()}`,
        },
        body: { grant_type: 'client_credentials' },
    });
    const tokenResponseSchema = z.object({
        access_token: z.string(),
    });
    const parsed = tokenResponseSchema.parse(response.data);
    return parsed.access_token;
}
