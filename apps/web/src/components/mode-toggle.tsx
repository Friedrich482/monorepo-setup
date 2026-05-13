import { useEffect, useState } from "react";

import { ModeToggleContent } from "@repo/ui/components/mode-toggle-content";
import { type Theme } from "@repo/ui/types-schemas";

export const ModeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleItemClick = (theme: Theme) => {
    setTheme(theme);
  };

  return <ModeToggleContent handleThemeClick={handleItemClick} />;
};
