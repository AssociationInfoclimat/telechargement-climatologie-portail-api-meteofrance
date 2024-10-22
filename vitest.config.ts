import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
        setupFiles: [new URL('./vitest.setup.ts', import.meta.url).pathname],
    },
});
