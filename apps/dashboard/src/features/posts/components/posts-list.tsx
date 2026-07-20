import { Link } from "react-router";
import { CircleSmall } from "lucide-react";

import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PostsList = () => {
  const trpc = useTRPC();

  const { data: posts } = useSuspenseQuery(trpc.posts.findAll.queryOptions());

  return posts.length === 0 ? (
    <p className="text-xl">No posts yet.</p>
  ) : (
    <ul className="text-foreground/75 dark:text-foreground/60 flex flex-col gap-y-8 text-lg w-1/2 max-sm:w-3/4">
      {posts.map((post) => (
        <li
          key={post.title}
          className="hover:text-primary/95 dark:hover:text-primary/75 w-full cursor-pointer text-start"
        >
          <Link to={`/posts/${post.slug}`} className="flex gap-2">
            <CircleSmall className="shrink-0" />
            <div className="space-x-4">
              <span>{post.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
