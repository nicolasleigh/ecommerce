import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { updateCustomer, updateSellers } from "../store/reducers/chatReducer";
import { socket } from "../utils/utils";
import Header from "./Header";

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
    <div className=' w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className='pt-4'>
        <Outlet />
      </div>
    </div>
  );
}
