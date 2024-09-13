import { APIResponse } from '@/api/APIResponse.js';
import { getUsingAxios, postUsingAxios } from '@/api/Axios.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function get(
    {
        url,
        params,
        headers,
    }: {
        url: string;
        params: Record<string, string>;
        headers?: { Authorization?: string };
    },
    { retries = 3 }: { retries?: number } = {}
): Promise<APIResponse> {
    try {
        return await getUsingAxios({ url, params, headers });
    } catch (error) {
        LoggerSingleton.getSingleton().warn({ data: error });
        if (retries <= 0) {
            throw error;
        }
        return await get({ url, params, headers }, { retries: retries - 1 });
    }
}

export async function post(
    {
        url,
        body,
        headers,
    }: {
        url: string;
        body: Record<string, string>;
        headers?: { Authorization?: string };
    },
    { retries = 3 }: { retries?: number } = {}
): Promise<APIResponse> {
    try {
        return await postUsingAxios({ url, body, headers });
    } catch (error) {
        LoggerSingleton.getSingleton().warn({ data: error });
        if (retries <= 0) {
            throw error;
        }
        return await post({ url, body, headers }, { retries: retries - 1 });
    }
}
