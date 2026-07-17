import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DRIZZLE_ASYNC_PROVIDER } from "@/drizzle/constants";
import { posts } from "@/drizzle/schema";
import { Inject, Injectable } from "@nestjs/common";
import { TRPCError } from "@trpc/server";

import {
  CreatePostDtoType,
  FindAllPostsDtoType,
  FindOnePostDtoType,
} from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private readonly db: NodePgDatabase,
  ) {}
  async create(createPostDto: CreatePostDtoType) {
    const { title, slug, content, authorId } = createPostDto;

    const [existingPostWithSameSlug] = await this.db
      .select({ slug: posts.slug })
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)))
      .limit(1);

    if (existingPostWithSameSlug) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A post with that slug already exists",
      });
    }

    const [createdPost] = await this.db
      .insert(posts)
      .values({ title, slug, content, authorId, publishedAt: new Date() })
      .returning({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        authorId: posts.authorId,
      });

    return createdPost;
  }

  async findAll(findAllPostsDto: FindAllPostsDtoType) {
    const { authorId } = findAllPostsDto;

    const postsFetched = await this.db
      .select({ title: posts.title, slug: posts.slug, content: posts.content })
      .from(posts)
      .where(eq(posts.authorId, authorId));

    return postsFetched;
  }

  async findOne(findOnePostDto: FindOnePostDtoType) {
    const { authorId, slug } = findOnePostDto;

    const [post] = await this.db
      .select({
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
      })
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)))
      .limit(1);

    if (!post) {
      return null;
    }

    return post;
  }
}
