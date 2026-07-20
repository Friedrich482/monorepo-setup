import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router";
import { Plus } from "lucide-react";

import { FallBackRender } from "@/components/boundaries/error-boundary";
import { SuspenseBoundary } from "@/components/boundaries/suspense-boundary";
import { PostsList } from "@/features/posts/components/posts-list";
import { Button } from "@repo/ui/components/ui/button";

export const Posts = () => {
  return (
    <main className="h-dvh flex flex-col items-center justify-start gap-12 pt-12">
      <div className="flex w-1/2 max-sm:w-3/4 items-center justify-between">
        <h1 className="text-3xl">Posts</h1>
        <Button asChild>
          <Link
            to="/posts/create"
            className="flex items-center justify-center gap-2 h-9"
          >
            <Plus />
            <span>Create Post</span>
          </Link>
        </Button>
      </div>

      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <FallBackRender
            error={error}
            className="pt-8"
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <SuspenseBoundary className="h-86 w-1/2 max-sm:w-3/4">
          <PostsList />
        </SuspenseBoundary>
      </ErrorBoundary>
    </main>
  );
};
