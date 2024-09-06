/**
 * @param date "YYYY-MM-DD hh:mm:ss"
 */
export function utcFrom(date: string): Date {
    return new Date(`${date.replace(' ', 'T')}Z`);
}
