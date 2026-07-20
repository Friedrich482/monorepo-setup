import { Outlet } from "react-router";

import { ModeToggle } from "../mode-toggle";

export const Layout = () => {
  return (
    <>
      <header className="flex justify-end items-center p-4">
        <ModeToggle />
      </header>
      <Outlet />
    </>
  );
};
