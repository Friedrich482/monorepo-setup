import { Link } from "react-router";

import { Button } from "@repo/ui/components/ui/button";

export const NotFound = () => {
  return (
    <main className="h-dvh flex flex-col items-center justify-start gap-12 pt-20">
      <h1 className="text-8xl font-bold">404</h1>
      <p>This page could not be found</p>

      <Button asChild className="w-44 h-10">
        <Link to="/">Go back home</Link>
      </Button>
    </main>
  );
};
