import { Logger, LogLevel } from '@/lib/logger/Logger.js';
import { pino } from 'pino';

export class PinoLogger implements Logger {
    private logger: ReturnType<typeof pino>;

    private constructor({ logger }: { logger: ReturnType<typeof pino> }) {
        this.logger = logger;
    }

    static of({ logger }: { logger: ReturnType<typeof pino> }): PinoLogger {
        return new PinoLogger({ logger });
    }

    setLogLevel(logLevel: LogLevel): void {
        this.logger.level = logLevel;
    }

    debug({ message, data }: { message?: string; data?: unknown }): void {
        this.logger.debug(data, message);
    }

    info({ message, data }: { message?: string; data?: unknown }): void {
        this.logger.info(data, message);
    }

    warn({ message, data }: { message?: string; data?: unknown }): void {
        this.logger.warn(data, message);
    }

    error({ message, data }: { message?: string; data?: unknown }): void {
        this.logger.error(data, message);
    }

    trace({ message, data }: { message?: string; data?: unknown }): void {
        const previousLevel = this.logger.level;
        this.logger.level = 'trace';
        this.logger.trace(data, message);
        this.logger.level = previousLevel;
    }
}
