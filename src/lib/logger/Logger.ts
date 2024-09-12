export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'silent';

export interface Logger {
    setLogLevel(logLevel: LogLevel): void;

    debug({ message, data }: { message?: string; data?: unknown }): void;

    info({ message, data }: { message?: string; data?: unknown }): void;

    warn({ message, data }: { message?: string; data?: unknown }): void;

    error({ message, data }: { message?: string; data?: unknown }): void;

    trace({ message, data }: { message?: string; data?: unknown }): void;
}
