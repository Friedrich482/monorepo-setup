import { ModeToggle } from "@/components/mode-toggle";
import { useTRPC } from "@/utils/trpc";
import { Button } from "@repo/ui/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Root = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.getHello.queryOptions({ name: "Friedrich" }),
  );

  return (
    <main>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl">Root</h1>
        <ModeToggle />
      </div>
      <p>Some text here</p>
      <Button>Shadcn button</Button>
      <p>Data fetched from the server: {data}</p>
    </main>
  );
};
