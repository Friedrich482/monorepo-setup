import { z } from "zod";

import { AuthRouter } from "@/auth/auth.router";
import { PostsRouter } from "@/posts/posts.router";
import { INestApplication, Injectable } from "@nestjs/common";
import * as trpcExpress from "@trpc/server/adapters/express";

import { createContext, TrpcService } from "./trpc.service";

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authRouter: AuthRouter,
    private readonly postsRouter: PostsRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    getHello: this.trpcService
      .publicProcedure()
      .input(
        z.object({
          name: z.string().min(1),
        }),
      )
      .query(({ input }) => `Hello, ${input.name} from trpc server`),

    ...this.authRouter.procedures(),
    ...this.postsRouter.procedures(),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter["appRouter"];
