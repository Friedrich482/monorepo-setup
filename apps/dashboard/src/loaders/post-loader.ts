import { type LoaderFunctionArgs, redirect } from "react-router";
import z from "zod";

import { trpcLoaderClient } from "@/utils/trpc";
import { SlugSchema } from "@repo/common/types-schemas";

import { protectedRouteLoader } from "./protect-route-loader";

const ParamsSchema = z.object({ slug: SlugSchema });

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  await protectedRouteLoader();

  const result = ParamsSchema.safeParse(params);
  if (!result.success) {
    throw redirect("/not-found");
  }

  const post = await trpcLoaderClient.posts.findOne.query({
    slug: result.data.slug,
  });

  if (!post) {
    throw redirect("/not-found");
  }

  return post;
};
