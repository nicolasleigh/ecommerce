import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";
import { privateRoutes } from "./privateRoutes";

export const getRoutes = () => {
  privateRoutes.map((route) => {
    route.element = <ProtectRoute route={route}>{route.element}</ProtectRoute>;
  });
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
