import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
        setupFiles: [new URL('./vitest.setup.ts', import.meta.url).pathname],
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    include: ['**/*.spec.ts'],
                    exclude: ['**/*.integration.spec.ts', '**/*.e2e.spec.ts'],
                    sequence: {
                        concurrent: true,
                    },
                },
            },
            {
                extends: true,
                test: {
                    name: 'integration',
                    include: ['**/*.integration.spec.ts'],
                    testTimeout: 1 * 60 * 1000,
                },
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    include: ['**/*.e2e.spec.ts'],
                    testTimeout: 1 * 60 * 1000,
                },
            },
        ],
    },
});
