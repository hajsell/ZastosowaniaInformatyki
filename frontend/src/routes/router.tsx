import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { HomePage } from "../pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
]);
