import { DrizzleModule } from "@/drizzle/drizzle.module";
import { Module } from "@nestjs/common";

import { PostsService } from "./posts.service";

@Module({
  imports: [DrizzleModule],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
