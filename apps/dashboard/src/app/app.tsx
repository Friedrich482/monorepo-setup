import { useState } from "react";
import { Outlet } from "react-router";
import superjson from "superjson";

import { ThemeProvider } from "@/providers/theme-provider";
import { isTRPCClientError, TRPCProvider } from "@/utils/trpc";
import type { AppRouter } from "@repo/trpc/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

// we define our tanstack query QueryClient
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 60 * 1000,
        retry: (failureCount, error) => {
          if (isTRPCClientError(error)) {
            return failureCount < 1;
          }

          return failureCount < 3;
        },
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  // if we are on the server, always make a new query client
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    // browser: make a query client if we don't already have one
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};

export const App = () => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // the url of the api, we define it in an environment variable
          url: import.meta.env.VITE_API_URL,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        {/* we wrap the entire app in the TRPCProvider */}
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <Outlet />
        </TRPCProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
