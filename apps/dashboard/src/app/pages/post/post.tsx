import { ErrorBoundary } from "react-error-boundary";
import { Link, useLoaderData } from "react-router";
import { ArrowLeft } from "lucide-react";

import { FallBackRender } from "@/components/boundaries/error-boundary";
import { SuspenseBoundary } from "@/components/boundaries/suspense-boundary";
import { PostArticle } from "@/features/post/components/post-article";
import type { postLoader } from "@/loaders/post-loader";
export const Post = () => {
  const post = useLoaderData<typeof postLoader>();

  return (
    <main className="flex flex-1 flex-col items-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-8 pt-8 max-xl:w-2/3 max-sm:w-[90%]">
        <div className="flex w-full items-center justify-between">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to posts</span>
          </Link>
        </div>

        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <FallBackRender
              error={error}
              className="w-1/2 self-center pt-8"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <SuspenseBoundary className="h-88 w-full">
            <PostArticle post={post} />
          </SuspenseBoundary>
        </ErrorBoundary>
      </section>
    </main>
  );
};
