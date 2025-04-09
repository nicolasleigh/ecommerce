import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { role } = useSelector((state) => state.auth);
  if (role === "seller") return <Navigate to='/dashboard' replace />;
  else return <Navigate to='/login' replace />;
}
