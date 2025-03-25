import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaList,
  FaLock,
  FaPhoneAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowDown, IoMdArrowDropdown, IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LanguageButton from "./LanguageButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MailCheck, SquareArrowOutUpRight } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartProductCount, wishlistCount } = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const handleClick = () => {
    navigate(`/products/search?category=${category}&value=${searchValue}`);
  };

  const redirectCartPage = () => {
    if (userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const redirectWishlistPage = () => {
    if (userInfo) {
      navigate("/dashboard/my-wishlist");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className='w-full bg-white'>
      {/* <div className='header-top bg-[#caddff] md-lg:hidden'> */}
      <div className='header-top bg-[#059473] md-lg:hidden'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-green-50'>
              <li className='flex relative justify-center items-center gap-2 text-sm '>
                <span>
                  <MdEmail />
                </span>
                <span className='text-green-50'>nicolas.leigh@qq.com</span>
              </li>
            </ul>
            <div>
              <div className='flex justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-4 text-green-50'>
                  <Link target='_blank' rel='noreferrer' to='https://github.com/nicolasleigh'>
                    <FaGithub />
                  </Link>
                </div>
                <div className='flex group cursor-pointer text-green-50 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-green-50 after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-green-50 before:w-[1px] before:-left-[20px] '>
                  <LanguageButton />
                </div>
                {userInfo ? (
                  <Link
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-green-50'
                    to='/dashboard'
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInfo.name}</span>
                  </Link>
                ) : (
                  <Link
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                    to='/login'
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
            <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
              <div className='flex justify-between items-center'>
                <Link to='/'>
                  <img src='/logo.svg' alt='logo' />
                </Link>
                <div
                  onClick={() => setShowSidebar(true)}
                  className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className='md-lg:w-full w-9/12'>
              <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                  <li>
                    <Link to='/' className={`p-2 block ${pathname === "/" ? "text-[#059473]" : "text-slate-600"}`}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/shop'
                      className={`p-2 block ${pathname === "/shop" ? "text-[#059473]" : "text-slate-600"}`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/cart'
                      className={`p-2 block ${pathname === "/cart" ? "text-[#059473]" : "text-slate-600"}`}
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/dashboard/my-wishlist'
                      className={`p-2 block ${
                        pathname === "/dashboard/my-wishlist" ? "text-[#059473]" : "text-slate-600"
                      }`}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/dashboard/chat'
                      className={`p-2 block ${pathname === "/contact" ? "text-[#059473]" : "text-slate-600"}`}
                    >
                      Contact Seller
                    </Link>
                  </li>
                </ul>

                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                  <div className='flex justify-center gap-5'>
                    <div
                      onClick={redirectWishlistPage}
                      className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'
                    >
                      <span className='text-xl text-green-500'>
                        <FaHeart />
                      </span>
                      {wishlistCount !== 0 && (
                        <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] '>
                          {wishlistCount}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirectCartPage}
                      className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'
                    >
                      <span className='text-xl text-green-500'>
                        <FaCartShopping />
                      </span>
                      {cartProductCount !== 0 && (
                        <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] '>
                          {cartProductCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md-lg:block'>
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed duration-500 transition-all ${
            !showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-50 transition-all duration-500 fixed ${
            !showSidebar ? "-left-[300px] top-0" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className='flex justify-start flex-col gap-6'>
            <Link to='/' className=''>
              <img src='/logo.svg' className='' alt='logo' />
            </Link>
            <div className='flex justify-start items-center gap-10'>
              <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute '>
                <LanguageButton />
              </div>
              {userInfo ? (
                <Link
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  to='/dashboard'
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to='/login'>
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </div>

            <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase '>
              <li>
                <Link to='/' className={`py-2 block ${pathname === "/" ? "text-[#059473]" : "text-slate-600"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/shop' className={`py-2 block ${pathname === "/shop" ? "text-[#059473]" : "text-slate-600"}`}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to='/cart' className={`py-2 block ${pathname === "/cart" ? "text-[#059473]" : "text-slate-600"}`}>
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to='/dashboard/my-wishlist'
                  className={`py-2 block ${
                    pathname === "/dashboard/my-wishlist" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to='/dashboard/chat'
                  className={`py-2 block ${pathname === "/contact" ? "text-[#059473]" : "text-slate-600"}`}
                >
                  Contact Seller
                </Link>
              </li>
            </ul>
            <div className='flex flex-col justify-start  gap-2'>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/nicolasleigh'
                className='flex items-center gap-2 text-slate-700'
              >
                <FaGithub size={20} />
                <span>Github</span>
                <SquareArrowOutUpRight size={20} strokeWidth={1.5} />
              </a>
              <ul className='flex flex-col justify-start items-start gap-3 text-slate-700'>
                <li className='flex justify-start items-center gap-2 text-sm'>
                  <span>
                    <MdEmail size={20} />
                  </span>
                  <span>nicolas.leigh@qq.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[85%] lg:w-[90%] mx-auto'>
        <div className='flex w-full flex-wrap md-lg:gap-8'>
          <div className='w-3/12 md-lg:w-full'>
            <div className='bg-white relative'>
              <div
                onClick={() => setShowCategory(!showCategory)}
                className='h-[50px] bg-[#059473] text-white rounded-sm flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold cursor-pointer'
              >
                <div className='flex justify-center items-center gap-3 '>
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className='pt-1'>
                  <IoIosArrowDown />
                </span>
              </div>
              <div
                className={`${
                  showCategory ? "h-0" : "h-[400px]"
                } overflow-auto transition-all md-lg:relative rounded-sm mt-2 duration-500 absolute z-[9999] bg-[#dbf3ed] w-full `}
              >
                <ul className=' text-slate-600 font-medium '>
                  {categories.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className='flex cursor-pointer border-b border-b-green-800 last:border-b-0 justify-start items-center gap-3 px-6 py-3'
                        onClick={() => {
                          navigate(`/products?category=${c.name}`);
                          setShowCategory(!showCategory);
                        }}
                      >
                        <img src={c.image} alt='category image' className='w-16 h-16 rounded-sm overflow-hidden' />
                        <span className='text-sm block uppercase'>{c.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
            <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
              <div className='w-8/12 md-lg:w-full'>
                <div className='flex  rounded-sm h-[50px] items-center '>
                  <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className='uppercase h-full w-1/2 rounded-s-sm rounded-e-none border-r-0 focus:ring-0 shadow-none'>
                      <SelectValue placeholder='category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c, i) => (
                        <SelectItem value={c.name} key={i} className='uppercase'>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type='text'
                    name=''
                    id=''
                    placeholder='ENTER PET NAME'
                    className='w-full border-l border-y   bg-transparent text-slate-500 outline-0 h-full px-3'
                  />
                  <button
                    onClick={handleClick}
                    className='bg-[#059473] rounded-r-sm  px-8 h-full font-semibold uppercase text-green-50'
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
                <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                  <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                    <span>
                      <MailCheck strokeWidth={1.2} />
                    </span>
                  </div>
                  <div className='flex justify-end flex-col gap-1'>
                    <h2 className='text-sm font-light text-slate-700'>Email Support</h2>
                    <span className='text-sm font-semibold  text-slate-700'>nicolas.leigh@qq.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
