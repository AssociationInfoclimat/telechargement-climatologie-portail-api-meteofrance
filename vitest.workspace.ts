import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    {
        extends: './vitest.config.ts',
        test: {
            name: 'unit',
            include: ['**/*.spec.ts'],
            exclude: ['**/*.integration.spec.ts'],
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
]);
