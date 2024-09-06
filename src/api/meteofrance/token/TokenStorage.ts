import { fetchToken } from '@/api/meteofrance/token/fetchToken.js';
import { readFile, writeFile } from 'node:fs/promises';

export class TokenStorage {
    static path: string = `${import.meta.dirname}/.token`;
    private static singleton: TokenStorage = new TokenStorage();
    private token: string;
    private currentUpdate: Promise<void> | null = null;

    constructor(token: string = '') {
        this.token = token;
    }

    static getSingleton(): TokenStorage {
        return TokenStorage.singleton;
    }

    static setSingleton(tokenStorage: TokenStorage): void {
        TokenStorage.singleton = tokenStorage;
    }

    async getToken(): Promise<string> {
        if (!this.token) {
            this.token = await this.loadFromFile();
        }
        if (!this.token) {
            await this.updateToken();
        }
        return this.token;
    }

    async updateToken(): Promise<void> {
        if (!this.currentUpdate) {
            this.currentUpdate = this._updateToken();
        }
        await this.currentUpdate;
        this.currentUpdate = null;
    }

    private async _updateToken(): Promise<void> {
        this.token = await fetchToken();
        await this.saveToFile();
    }

    private async loadFromFile(): Promise<string> {
        try {
            return await readFile(TokenStorage.path, { encoding: 'utf8' });
        } catch (e: unknown) {
            if (e instanceof Error && 'code' in e && e.code !== 'ENOENT') {
                throw e;
            }
            return '';
        }
    }

    private saveToFile(): Promise<void> {
        return writeFile(TokenStorage.path, this.token, { encoding: 'utf8' });
    }
}
