import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@repo/ui/components/ui/button";

export const Root = () => {
  return (
    <main>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl">Root</h1>
        <ModeToggle />
      </div>
      <p>Some text here</p>
      <Button>Shadcn button</Button>
    </main>
  );
};
