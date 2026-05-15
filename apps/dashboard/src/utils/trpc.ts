import type { AppRouter } from "@repo/trpc/router";
import { TRPCClientError } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

export const isTRPCClientError = (
  error: unknown,
): error is TRPCClientError<AppRouter> => {
  return error instanceof TRPCClientError;
};

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;
