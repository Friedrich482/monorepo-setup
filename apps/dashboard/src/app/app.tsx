import { Outlet } from "react-router";

import { ThemeProvider } from "@/providers/theme-provider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Outlet />
    </ThemeProvider>
  );
};
