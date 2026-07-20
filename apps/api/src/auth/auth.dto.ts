import z from "zod";

export const CheckAuthStatusDto = z.object({
  user: z.object({ sub: z.ulid() }),
});

export type CheckAuthStatusDtoType = z.infer<typeof CheckAuthStatusDto>;
