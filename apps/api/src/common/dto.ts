import { z } from "zod";

export const JWTDto = z.object({
  sub: z.string().min(1),
  iat: z.number().int(),
  exp: z.number().int(),
});

export type JWTDtoType = z.infer<typeof JWTDto>;
