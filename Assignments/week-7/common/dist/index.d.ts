import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type inputType = z.infer<typeof signupInput>;
export declare const todoBodyInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    done: z.ZodBoolean;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    done: boolean;
    id: string;
}, {
    title: string;
    description: string;
    done: boolean;
    id: string;
}>;
export type todoBodyType = z.infer<typeof todoBodyInput>;
