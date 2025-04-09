import { lazy } from "react";

const Login = lazy(() => import("../../views/auth/Login"));
const Signup = lazy(() => import("../../views/auth/Signup"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/Home"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));

const publicRoutes = [
  {
    path: "/seller",
    element: <Home />,
  },
  {
    path: "/seller/login",
    element: <Login />,
  },
  {
    path: "/seller/signup",
    element: <Signup />,
  },
  {
    path: "/seller/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/seller/unauthorized",
    element: <UnAuthorized />,
  },
];

export default publicRoutes;
