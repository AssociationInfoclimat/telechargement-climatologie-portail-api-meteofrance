import { RefinementCtx, z } from 'zod';

export function createTransform<I, O>(fn: (value: I) => O) {
    return function (value: I, ctx: RefinementCtx): O {
        try {
            return fn(value);
        } catch (e) {
            if (!(e instanceof Error)) {
                throw e;
            }
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: e.message,
            });
            return z.NEVER;
        }
    };
}
