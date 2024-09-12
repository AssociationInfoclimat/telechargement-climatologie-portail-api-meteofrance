import { Logger } from '@/lib/logger/Logger.js';
import { PinoLogger } from '@/lib/logger/PinoLogger.js';
import { pino } from 'pino';

export class LoggerSingleton {
    private static singleton: Logger = PinoLogger.of({ logger: pino({ level: 'error' }) });

    static getSingleton(): Logger {
        return LoggerSingleton.singleton;
    }

    static setSingleton(logger: Logger): void {
        LoggerSingleton.singleton = logger;
    }
}
