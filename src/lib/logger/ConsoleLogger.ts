import { Logger, LogLevel } from '@/lib/logger/Logger.js';

const LEVEL_TO_INDEX_MAP: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3,
    silent: 4,
};

export class ConsoleLogger implements Logger {
    private logLevel: LogLevel = 'error';

    constructor({ logLevel = 'error' }: { logLevel?: LogLevel } = {}) {
        this.logLevel = logLevel;
    }

    setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel;
    }

    debug({ message, data }: { message?: string; data?: unknown }): void {
        this.log({ level: 'debug', message, data });
    }

    info({ message, data }: { message?: string; data?: unknown }): void {
        this.log({ level: 'info', message, data });
    }

    warn({ message, data }: { message?: string; data?: unknown }): void {
        this.log({ level: 'warning', message, data });
    }

    error({ message, data }: { message?: string; data?: unknown }): void {
        this.log({ level: 'error', message, data });
    }

    trace({ message, data }: { message?: string; data?: unknown }): void {
        console.trace(message, data);
    }

    private log({ level, message, data }: { level: LogLevel; message?: string; data?: unknown }): void {
        if (LEVEL_TO_INDEX_MAP[this.logLevel] <= LEVEL_TO_INDEX_MAP[level]) {
            let log = `[${level.toUpperCase()}] ${message}`;
            if (data) {
                if (data instanceof Error) {
                    data = {
                        message: data.message,
                        name: data.name,
                        cause: data.cause,
                        stack: data.stack,
                        error: data.toString(),
                    };
                }
                log += `\n${JSON.stringify(data, null, 4)}`;
            }
            console.log(log);
        }
    }
}
