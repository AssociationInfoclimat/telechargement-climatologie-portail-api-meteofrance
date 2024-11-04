import { get } from '@/api/api-call.js';
import { APIResponse } from '@/api/APIResponse.js';
import { TokenStorage } from '@/api/meteofrance/token/TokenStorage.js';
import { wait } from '@/lib/wait.js';

export async function getMF<T>(
    {
        url,
        params = {},
    }: {
        url: string;
        params?: Record<string, string>;
    },
    { retries = 3 }: { retries?: number } = {}
): Promise<APIResponse<T>> {
    const tokenStorage = TokenStorage.getSingleton();
    const token = await tokenStorage.getToken();
    const response = await get<T>({
        url,
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.code === 401 && retries > 0) {
        await tokenStorage.updateToken();
        return getMF({ url, params }, { retries: retries - 1 });
    }
    if (response.code === 429) {
        await wait(10 * 1000);
        return getMF({ url, params }, { retries });
    }
    return response;
}
