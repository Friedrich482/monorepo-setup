import { type Outputs } from "@/utils/trpc";

export const PostArticle = ({
  post,
}: {
  post: NonNullable<Outputs["posts"]["findOne"]>;
}) => {
  return (
    <article className="flex w-full flex-col items-start justify-center gap-7 text-start">
      <div className="flex w-full flex-col">
        <h1 className="mb-2 text-4xl font-extrabold wrap-anywhere max-sm:text-3xl">
          {post.title}
        </h1>
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col opacity-95">{post.content}</div>
      </div>
    </article>
  );
};
