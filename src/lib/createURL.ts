export function createURL(url: string, params?: Record<string, string>): string {
    return !params ? url : `${url}?${new URLSearchParams(params)}`;
}
