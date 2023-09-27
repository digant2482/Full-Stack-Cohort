import { z } from 'zod'

export const signupInput = z.object({
  username: z.string(),
  password: z.string()
})

export type inputType = z.infer<typeof signupInput>;

export const todoBodyInput = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
  id: z.string()
})

export type todoBodyType = z.infer<typeof todoBodyInput>;