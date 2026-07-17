import z from "zod";

export const CreateUserDto = z.object({
  email: z.email(),
  username: z.string().min(1).max(25),
  password: z.string().min(1).max(72),
});

export const FindByEmailDto = z.object({
  email: z.email(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type FindByEmailDtoType = z.infer<typeof FindByEmailDto>;
