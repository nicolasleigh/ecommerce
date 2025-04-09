import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ route, children }) {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    if (userInfo) {
      if (userInfo.role === route.role) return <Suspense fallback={null}>{children}</Suspense>;
      else return <Navigate to='/unauthorized' replace />;
    }
  } else return <Navigate to='/login' replace />;
}
