import { ConsoleLogger } from '@/lib/logger/ConsoleLogger.js';
import { Logger } from '@/lib/logger/Logger.js';

export class LoggerSingleton {
    private static singleton: Logger = new ConsoleLogger({ logLevel: 'error' });

    static getSingleton(): Logger {
        return LoggerSingleton.singleton;
    }

    static setSingleton(logger: Logger): void {
        LoggerSingleton.singleton = logger;
    }
}
