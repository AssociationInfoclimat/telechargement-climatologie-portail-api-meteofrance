import { get } from '@/api/api-call.js';
import { APIResponse } from '@/api/APIResponse.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';

export async function getMF<T>({
    url,
    params,
}: {
    url: string;
    params: Record<string, string>;
}): Promise<APIResponse<T>> {
    const token = await TokenStorage.getSingleton().getToken();
    return get({
        url,
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
