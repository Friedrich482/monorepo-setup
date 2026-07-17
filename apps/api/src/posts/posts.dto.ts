import z from "zod";

export const CreatePostDto = z.object({
  title: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  content: z.string().min(1),
  authorId: z.ulid(),
});

export const FindAllPostsDto = z.object({
  authorId: z.ulid(),
});

export const FindOnePostDto = z.object({
  slug: z.string().min(1).max(150),
  authorId: z.ulid(),
});

export type CreatePostDtoType = z.infer<typeof CreatePostDto>;
export type FindAllPostsDtoType = z.infer<typeof FindAllPostsDto>;
export type FindOnePostDtoType = z.infer<typeof FindOnePostDto>;
