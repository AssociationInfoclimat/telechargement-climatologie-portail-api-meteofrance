import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    {
        extends: './vitest.config.ts',
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
        extends: './vitest.config.ts',
        test: {
            name: 'integration',
            include: ['**/*.integration.spec.ts'],
            testTimeout: 1 * 60 * 1000,
        },
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: 'e2e',
            include: ['**/*.e2e.spec.ts'],
            testTimeout: 1 * 60 * 1000,
        },
    },
]);
