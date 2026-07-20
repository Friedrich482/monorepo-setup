import { redirect } from "react-router";

import { isTRPCClientError, trpcLoaderClient } from "@/utils/trpc";

// protects routes
export const protectedRouteLoader = async () => {
  try {
    await trpcLoaderClient.auth.checkAuthStatus.query();
  } catch (error) {
    if (isTRPCClientError(error) && error.data?.code === "UNAUTHORIZED") {
      throw redirect("/login");
    }
  }
};
