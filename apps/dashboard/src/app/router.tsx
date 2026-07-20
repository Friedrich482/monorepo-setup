import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Layout } from "@/components/layout/layout";
import { authRouteLoader } from "@/loaders/auth-route-loader";
import { postLoader } from "@/loaders/post-loader";
import { protectedRouteLoader } from "@/loaders/protect-route-loader";
import { redirectToNotFoundLoader } from "@/loaders/redirect-to-not-found-loader";
import { rootLoader } from "@/loaders/root-loader";

import { App } from "./app";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { CreatePost } from "./pages/create-post/create-post";
import { NotFound } from "./pages/not-found/not-found";
import { Post } from "./pages/post/post";
import { Posts } from "./pages/posts/posts";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            loader: rootLoader,
          },
          {
            path: "posts",
            element: <Posts />,
            loader: protectedRouteLoader,
          },
          {
            path: "posts/:slug",
            element: <Post />,
            loader: postLoader,
          },
          {
            path: "posts/create",
            element: <CreatePost />,
            loader: protectedRouteLoader,
          },
          {
            path: "not-found",
            element: <NotFound />,
          },
          {
            path: "*",
            loader: redirectToNotFoundLoader,
          },
        ],
      },
      {
        children: [
          {
            path: "register",
            element: <Register />,
            loader: authRouteLoader,
          },
          {
            path: "login",
            element: <Login />,
            loader: authRouteLoader,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
