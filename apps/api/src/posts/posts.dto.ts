import z from "zod";

export const CreatePostDto = z.object({
  title: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  content: z.string().min(1),
});

export const FindOnePostDto = z.object({
  slug: z.string().min(1).max(150),
});

type AuthorId = { authorId: string };
export type CreatePostDtoType = z.infer<typeof CreatePostDto> & AuthorId;
export type FindAllPostsDtoType = AuthorId;
export type FindOnePostDtoType = z.infer<typeof FindOnePostDto> & AuthorId;
