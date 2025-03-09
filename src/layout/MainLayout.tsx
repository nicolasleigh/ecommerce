import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { socket } from "../utils/utils";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  );
}
