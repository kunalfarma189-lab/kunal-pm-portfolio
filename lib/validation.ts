import { z } from "zod";

// Server-side validation for the login form. Client-side validation is UX
// only — every server action re-validates with these schemas.

export const LOGIN_ERROR = "Invalid email or password";

const emailField = z
  .string()
  .max(254)
  .transform((v) => v.trim().toLowerCase())
  .pipe(z.email(LOGIN_ERROR));

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, LOGIN_ERROR).max(200, LOGIN_ERROR),
});

export type LoginInput = z.infer<typeof loginSchema>;
