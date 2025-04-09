import { lazy } from "react";

const Login = lazy(() => import("../../views/auth/Login"));
const Signup = lazy(() => import("../../views/auth/Signup"));
const Home = lazy(() => import("../../views/Home"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
];

export default publicRoutes;
