import z from "zod";

export const SlugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase, alphanumeric, and may contain hyphens (no spaces, no special characters)",
  );

export const RegisterSchema = z.object({
  username: z.string().min(1).max(25),
  email: z.email(),
  password: z.string().min(1).max(72),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(72),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(150),
  slug: SlugSchema,
  content: z.string().min(1),
});

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
