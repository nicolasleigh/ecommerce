import { lazy } from "react";

const Login = lazy(() => import("../../views/auth/Login"));
const Signup = lazy(() => import("../../views/auth/Signup"));

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export default publicRoutes;
