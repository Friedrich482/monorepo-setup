import z from "zod";

export const RegisterDto = z.object({
  username: z.string().min(1).max(25),
  email: z.email(),
  password: z.string().min(1).max(72),
});

export const LoginDto = z.object({
  email: z.email(),
  password: z.string().min(1).max(72),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
export type LoginDtoType = z.infer<typeof LoginDto>;
