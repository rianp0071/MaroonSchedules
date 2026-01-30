import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";
import { Search } from "./components/Search";
import { Builder } from "./components/Builder";
import { Saved } from "./components/Saved";
import { Profile } from "./components/Profile";
import { CourseDetail } from "./components/CourseDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboarding />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/search", element: <Search /> },
      { path: "/builder", element: <Builder /> },
      { path: "/saved", element: <Saved /> },
      { path: "/profile", element: <Profile /> },
      { path: "/course/:id", element: <CourseDetail /> },
    ],
  },
]);
