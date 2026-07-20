import { redirect } from "react-router";

import { trpcLoaderClient } from "@/utils/trpc";

// prevents a logged in user to access an auth route
export const authRouteLoader = async () => {
  try {
    await trpcLoaderClient.auth.checkAuthStatus.query();
    return redirect("/posts");
  } catch {
    return null;
  }
};
