import { APIResponse } from '@/api/APIResponse.js';
import axios, { AxiosResponse } from 'axios';

export function getAPIResponseFromAxiosResponse<T>(response: AxiosResponse): {
    code: number;
    message: string;
    data: T;
} {
    return {
        code: response.status,
        message: response.statusText,
        data: response.data,
    };
}

export async function getUsingAxios<T>({
    url,
    params,
    headers = {},
}: {
    url: string;
    params: Record<string, string>;
    headers?: { Authorization?: string };
}): Promise<APIResponse<T>> {
    const response = await axios.get(url, {
        params,
        headers: {
            ...headers,
        },
        validateStatus: () => true,
    });
    return getAPIResponseFromAxiosResponse(response);
}

export async function postUsingAxios<T>({
    url,
    body,
    headers = {},
}: {
    url: string;
    body: Record<string, string>;
    headers?: { Authorization?: string };
}): Promise<APIResponse<T>> {
    const response = await axios.post(url, body, {
        headers: {
            ...headers,
        },
    });
    return getAPIResponseFromAxiosResponse(response);
}
