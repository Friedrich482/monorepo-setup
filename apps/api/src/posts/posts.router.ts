import { TrpcService } from "@/trpc/trpc.service";
import { Injectable } from "@nestjs/common";

import { CreatePostDto, FindOnePostDto } from "./posts.dto";
import { PostsService } from "./posts.service";

@Injectable()
export class PostsRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly postsService: PostsService,
  ) {}

  procedures() {
    return {
      posts: this.trpcService.trpc.router({
        create: this.trpcService
          .protectedProcedure()
          .input(CreatePostDto)
          .mutation(async ({ ctx, input }) =>
            this.postsService.create({ ...input, authorId: ctx.user.sub }),
          ),

        findAll: this.trpcService
          .protectedProcedure()
          .query(async ({ ctx }) =>
            this.postsService.findAll({ authorId: ctx.user.sub }),
          ),

        findOne: this.trpcService
          .protectedProcedure()
          .input(FindOnePostDto)
          .query(async ({ ctx, input }) =>
            this.postsService.findOne({ ...input, authorId: ctx.user.sub }),
          ),
      }),
    };
  }
}
