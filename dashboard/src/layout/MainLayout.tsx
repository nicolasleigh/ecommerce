import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { socket } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateSellers } from "../store/reducers/chatReducer";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeCustomer", (customer) => {
      dispatch(updateCustomer(customer));
    });
    socket.on("activeSeller", (sellers) => {
      dispatch(updateSellers(sellers));
    });
  });

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
