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
        if (message !== undefined) {
            this.logger.debug(message, data);
        } else {
            this.logger.debug(data);
        }
    }

    info({ message, data }: { message?: string; data?: unknown }): void {
        if (message !== undefined) {
            this.logger.info(message, data);
        } else {
            this.logger.info(data);
        }
    }

    warn({ message, data }: { message?: string; data?: unknown }): void {
        if (message !== undefined) {
            this.logger.warn(message, data);
        } else {
            this.logger.warn(data);
        }
    }

    error({ message, data }: { message?: string; data?: unknown }): void {
        if (message !== undefined) {
            this.logger.error(message, data);
        } else {
            this.logger.error(data);
        }
    }

    trace({ message, data }: { message?: string; data?: unknown }): void {
        const previousLevel = this.logger.level;
        this.logger.level = 'trace';
        if (message !== undefined) {
            this.logger.trace(message, data);
        } else {
            this.logger.trace(data);
        }
        this.logger.level = previousLevel;
    }
}
