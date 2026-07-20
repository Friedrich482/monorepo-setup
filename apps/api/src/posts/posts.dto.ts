import z from "zod";

import {
  CreatePostSchema as CreatePostDto,
  SlugSchema,
} from "@repo/common/types-schemas";

export const FindOnePostDto = z.object({
  slug: SlugSchema,
});

type AuthorId = { authorId: string };
export type CreatePostDtoType = z.infer<typeof CreatePostDto> & AuthorId;
export type FindAllPostsDtoType = AuthorId;
export type FindOnePostDtoType = z.infer<typeof FindOnePostDto> & AuthorId;
