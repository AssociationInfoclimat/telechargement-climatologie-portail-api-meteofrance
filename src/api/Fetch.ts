import { APIResponse } from '@/api/APIResponse.js';
import { createURL } from '@/lib/createURL.js';

export async function getAPIResponseFromResponse<T>(response: Response): Promise<{
    code: number;
    message: string;
    data: T;
}> {
    const json: T = await response.json();
    return {
        code: response.status,
        message: response.statusText,
        data: json,
    };
}

export async function getUsingFetch<T>({
    url,
    params,
    headers = {},
}: {
    url: string;
    params: Record<string, string>;
    headers?: { Authorization?: string };
}): Promise<APIResponse<T>> {
    const response = await fetch(createURL(url, params), {
        method: 'GET',
        headers: {
            ...headers,
        },
    });
    return await getAPIResponseFromResponse(response);
}

export async function postUsingFetch<T>({
    url,
    body,
    headers = {},
}: {
    url: string;
    body: Record<string, string>;
    headers?: { Authorization?: string };
}): Promise<APIResponse<T>> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: new URLSearchParams(body),
    });
    return await getAPIResponseFromResponse(response);
}
