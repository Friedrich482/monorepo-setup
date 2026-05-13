import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Theme } from "#types-schemas.ts";

export const ModeToggleContent = ({
  handleThemeClick,
}: {
  handleThemeClick: (theme: Theme) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="p-4.5!">
        <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => handleThemeClick("light")}>
        <Sun />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleThemeClick("dark")}>
        <Moon />
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleThemeClick("system")}>
        <Monitor />
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
