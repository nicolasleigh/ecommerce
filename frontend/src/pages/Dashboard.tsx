import { FaBorderAll, FaHeart, FaList } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import api from "../api";
import { useDispatch } from "react-redux";
import { userReset } from "../store/reducers/authReducer";
import { resetCount } from "../store/reducers/cartReducer";

export default function Dashboard() {
  const [filterShow, setFilterShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(userReset());
      dispatch(resetCount());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className='bg-slate-200 mt-5'>
        <div className='w-[90%] mx-auto md-lg:block hidden'>
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className='text-center py-3 px-3 bg-green-700 text-white'
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className='h-full mx-auto'>
          <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className='py-2 text-slate-600 px-4'>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-xl'>
                    <IoIosHome />
                  </span>
                  <Link to='/dashboard' className='block'>
                    Dashboard
                  </Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-xl'>
                    <FaBorderAll />
                  </span>
                  <Link to='/dashboard/my-orders' className='block'>
                    My Orders
                  </Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-xl'>
                    <FaHeart />
                  </span>
                  <Link to='/dashboard/my-wishlist' className='block'>
                    Wishlist
                  </Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-xl'>
                    <IoChatbubbleEllipses />
                  </span>
                  <Link to='/dashboard/chat' className='block'>
                    Chat
                  </Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-xl'>
                    <RiLockPasswordFill />
                  </span>
                  <Link to='/dashboard/change-password' className='block'>
                    Change Password
                  </Link>
                </li>
                <li onClick={logout} className='flex justify-start items-center gap-2 py-2 cursor-pointer'>
                  <span className='text-xl'>
                    <IoMdLogOut />
                  </span>
                  <div className='block'>Logout</div>
                </li>
              </ul>
            </div>

            <div className='w-[calc(100%-270px)] md-lg:w-full'>
              <div className='mx-4 md-lg:mx-0'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
