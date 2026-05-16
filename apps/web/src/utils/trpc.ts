import superjson from "superjson";

import type { AppRouter } from "@repo/trpc/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.PUBLIC_API_URL,
      transformer: superjson,
    }),
  ],
});

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;
