import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectUser() {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' replace />;
  }
}
