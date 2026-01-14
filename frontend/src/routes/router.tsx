import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/Layout/MainLayout";
import { PlainLayout } from "../components/Layout/PlainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { AddPostPage } from "../pages/AddPostPage/AddPostPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  {
    element: <PlainLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "posts/:id", element: <PostPage /> },
      { path: "add", element: <AddPostPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "edit/:id", element: <AddPostPage /> },
    ],
  },
]);