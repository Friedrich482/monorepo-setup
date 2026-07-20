import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSlug } from "@repo/common/generate-slug";
import { Button } from "@repo/ui/components/ui/button";
import { Field, FieldError, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

import {
  CreatePostFormSchema,
  type CreatePostFormSchemaType,
} from "../types-schemas";

export const CreatePostForm = () => {
  const form = useForm<CreatePostFormSchemaType>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const navigate = useNavigate();
  const trpc = useTRPC();

  const createPostMutation = useMutation(trpc.posts.create.mutationOptions());

  const onSubmit = (values: CreatePostFormSchemaType) => {
    createPostMutation.mutate(
      {
        title: values.title,
        content: values.content,
        slug: generateSlug(values.title),
      },
      {
        onError: (error) => {
          const errorMessage = error.message;

          if (errorMessage.toLowerCase().includes("title")) {
            form.setError("title", { message: errorMessage });
          } else if (errorMessage.toLowerCase().includes("content")) {
            form.setError("content", { message: errorMessage });
          } else {
            form.setError("root", { message: errorMessage });
          }
        },

        onSuccess: async (_, __, ___, { client }) => {
          toast.success("Post created");

          await client.invalidateQueries({
            queryKey: trpc.posts.findAll.queryKey(),
            exact: true,
          });

          navigate("/posts");
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-[clamp(40%,30rem,80%)] flex-col gap-4 p-2 place-self-start"
    >
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              id={field.name}
              placeholder="Title"
              type="text"
              aria-invalid={fieldState.invalid}
              className="border-border h-10"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Content</FieldLabel>
            <Textarea
              id={field.name}
              placeholder="Start writing..."
              aria-invalid={fieldState.invalid}
              className="border-border h-40"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-10 w-1/3 self-start rounded-lg bg-primary text-primary-foreground"
      >
        Submit
      </Button>

      <div className="h-4">
        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}
      </div>
    </form>
  );
};
