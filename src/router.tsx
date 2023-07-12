import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "./components/route_guards/AuthRoute";
import Layout from "./components/Layout";
import RolesAuthRoute from "./components/route_guards/RolesAuthRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import { Roles } from "./types";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute privateRoute={true}>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: (
          <RolesAuthRoute requiredRole={Roles.admin}>
            <AdminPanel />
          </RolesAuthRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthRoute privateRoute={false}>
        <Login />
      </AuthRoute>
    ),
  },
]);

export default router;
