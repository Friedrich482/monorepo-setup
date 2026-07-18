import { AuthModule } from "@/auth/auth.module";
import { AuthRouter } from "@/auth/auth.router";
import { EnvService } from "@/env/env.service";
import { PostsModule } from "@/posts/posts.module";
import { PostsRouter } from "@/posts/posts.router";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Module({
  imports: [AuthModule, PostsModule],
  providers: [
    TrpcService,
    TrpcRouter,
    JwtService,
    EnvService,
    AuthRouter,
    PostsRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
