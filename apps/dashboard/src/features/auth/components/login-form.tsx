import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginSchemaType } from "@repo/common/types-schemas";
import { Button } from "@repo/ui/components/ui/button";
import { Field, FieldError, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import { useTogglePassword } from "../hooks/use-toggle-password";

export const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPasswordVisible, EyeIconComponent } = useTogglePassword();

  const navigate = useNavigate();
  const trpc = useTRPC();
  const loginMutation = useMutation(trpc.auth.login.mutationOptions());

  const onSubmit = (values: LoginSchemaType) => {
    loginMutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const errorMessage = error.message;

          if (errorMessage.toLowerCase().includes("email")) {
            form.setError("email", { message: errorMessage });
          } else if (errorMessage.toLowerCase().includes("password")) {
            form.setError("password", { message: errorMessage });
          } else {
            form.setError("root", { message: errorMessage });
          }
        },

        onSuccess: () => {
          toast.success("Login complete");

          navigate("/posts");
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-[clamp(40%,30rem,80%)] flex-col gap-4 p-2"
    >
      <h2 className="flex flex-col items-center justify-center gap-2 text-center text-3xl font-extrabold max-[42.5rem]:text-2xl">
        Login
      </h2>

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              id={field.name}
              placeholder="example@email.com"
              type="email"
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
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <div className="relative flex items-center justify-end">
              <Input
                id={field.name}
                placeholder="***********"
                type={isPasswordVisible ? "text" : "password"}
                aria-invalid={fieldState.invalid}
                className="border-border h-10"
                {...field}
              />
              <EyeIconComponent />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <p>
        Not registered yet?{" "}
        <Link to="/register" className="underline">
          Register
        </Link>
      </p>

      <Button
        variant="default"
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-10 w-1/2 self-center rounded-lg"
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
