import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import RequireAuth from "./components/requireAuth";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <RedirectLink />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
