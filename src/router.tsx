import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

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
