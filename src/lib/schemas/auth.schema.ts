import z, { email } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  email: z.email({
    message: "กรอกอีเมลด้วยจ๊า",
  }),
  password: z.string().regex(/^[0-9a-z]{6,}$/),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
