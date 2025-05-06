import { ArrowBigLeft, Book, Heart, House, Lock, LogOut, MessageSquareMore } from "lucide-react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
              className='text-center py-3 px-3 bg-[#059473] text-white rounded-sm'
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className='h-full mx-auto'>
          <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "left-10 -top-10 border shadow-2xl border-slate-400" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className='py-2 text-slate-600 px-2'>
                <Link to='/dashboard' className='block hover:bg-muted rounded-md' onClick={() => setFilterShow(false)}>
                  <li className='flex justify-start items-center gap-2 py-2 px-4'>
                    <House size={20} />
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link
                  to='/dashboard/my-orders'
                  className='block hover:bg-muted rounded-md'
                  onClick={() => setFilterShow(false)}
                >
                  <li className='flex justify-start items-center gap-2 py-2 px-4'>
                    <span className='text-xl'>
                      <Book size={20} />
                    </span>
                    My Orders
                  </li>
                </Link>
                <Link
                  to='/dashboard/my-wishlist'
                  className='block hover:bg-muted rounded-md'
                  onClick={() => setFilterShow(false)}
                >
                  <li className='flex justify-start items-center gap-2 py-2 px-4'>
                    <span className='text-xl'>
                      <Heart size={20} />
                    </span>
                    Wishlist
                  </li>
                </Link>
                <Link
                  to='/dashboard/chat'
                  className='block hover:bg-muted rounded-md'
                  onClick={() => setFilterShow(false)}
                >
                  <li className='flex justify-start items-center gap-2 py-2 px-4'>
                    <span className='text-xl'>
                      <MessageSquareMore size={20} />
                    </span>
                    Chat Seller
                  </li>
                </Link>
                <Link
                  to='/dashboard/change-password'
                  className='block hover:bg-muted rounded-md'
                  onClick={() => setFilterShow(false)}
                >
                  <li className='flex justify-start items-center gap-2 py-2 px-4'>
                    <span className='text-xl'>
                      <Lock size={20} />
                    </span>
                    Change Password
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className='flex justify-start items-center gap-2 py-2 px-4 cursor-pointer hover:bg-muted rounded-md'
                >
                  <span className='text-xl'>
                    <LogOut size={20} />
                  </span>
                  <div className='block'>Logout</div>
                </li>
                <li className='flex justify-start items-center gap-2 py-2 px-4 cursor-pointer hover:bg-muted rounded-md'>
                  <span className='text-xl'>
                    <ArrowBigLeft size={20} />
                  </span>
                  <a
                    href='https://seller.pet.linze.pro'
                    target='_blank'
                    referrerPolicy='no-referrer'
                    className='block '
                  >
                    Seller Page
                  </a>
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
