import { expect } from 'vitest';

expect.extend({
    nullOrAny(received, expected) {
        const { equals, isNot } = this;
        return {
            pass: received === null || equals(received, expect.any(expected)),
            message: () =>
                `Expected '${received}' ${isNot ? 'not ' : ''}to be null or ${isNot ? 'not ' : ''}to be an instance of ${expected}`,
        };
    },
});
