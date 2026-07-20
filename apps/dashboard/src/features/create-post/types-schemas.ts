import z from "zod";

import { CreatePostSchema } from "@repo/common/types-schemas";

export const CreatePostFormSchema = CreatePostSchema.omit({ slug: true });

export type CreatePostFormSchemaType = z.infer<typeof CreatePostFormSchema>;
