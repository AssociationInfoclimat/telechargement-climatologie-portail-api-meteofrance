import dotenv from 'dotenv';

dotenv.config();

export class Env {
    private static singleton: Env = Env.fromProcessEnv();
    private env: Record<string, string | undefined> = {};

    private constructor(env: Record<string, string | undefined> = {}) {
        this.env = env;
    }

    static fromProcessEnv(): Env {
        return new Env(process.env);
    }

    static getSingleton(): Env {
        return Env.singleton;
    }

    static setSingleton(env: Env): void {
        Env.singleton = env;
    }

    getMeteoFranceApplicationId(): string {
        const applicationId = this.env.METEOFRANCE_APPLICATION_ID;
        if (!applicationId) {
            throw new Error('METEO_FRANCE_APPLICATION_ID is not defined');
        }
        return applicationId;
    }
}
