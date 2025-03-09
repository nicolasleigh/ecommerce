import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

export default function Shipping() {
  const {
    state: { products, price, shippingFee, items },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shippingFee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };
  return (
    <div>
      <Header />

      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shipping Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Shipping</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#eee]'>
        <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
          <div className='w-full flex flex-wrap'>
            <div className='w-[67%] md-lg:w-full'>
              <div className='flex flex-col gap-3'>
                <div className='bg-white p-6 shadow-sm rounded-md'>
                  <h2 className='text-slate-600 font-bold pb-3'>Shipping Information</h2>

                  {!res && (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='name'>Name</label>
                            <input
                              value={state.name}
                              onChange={handleChange}
                              type='text'
                              name='name'
                              id='name'
                              placeholder='Name'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='address'>Address</label>
                            <input
                              value={state.address}
                              onChange={handleChange}
                              type='text'
                              name='address'
                              id='address'
                              placeholder='Address'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='phone'>Phone</label>
                            <input
                              value={state.phone}
                              onChange={handleChange}
                              type='text'
                              name='phone'
                              id='phone'
                              placeholder='Phone'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='post'>Post</label>
                            <input
                              value={state.post}
                              onChange={handleChange}
                              type='text'
                              name='post'
                              id='post'
                              placeholder='Post'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='province'>Province</label>
                            <input
                              value={state.province}
                              onChange={handleChange}
                              type='text'
                              name='province'
                              id='province'
                              placeholder='Province'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='city'>City</label>
                            <input
                              value={state.city}
                              onChange={handleChange}
                              type='text'
                              name='city'
                              id='city'
                              placeholder='City'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='area'>Area</label>
                            <input
                              value={state.area}
                              onChange={handleChange}
                              type='text'
                              name='area'
                              id='area'
                              placeholder='Area'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mt-8 mb-2 w-full'>
                            <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                              Save Change
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {res && (
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-slate-600 font-semibold pb-2'>Deliver To {state.name}</h2>
                      <p>
                        <span className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>
                          Home
                        </span>
                        <span>
                          {state.phone} {state.address} {state.province} {state.city} {state.area}{" "}
                        </span>
                        <span onClick={() => setRes(false)} className='text-indigo-500 cursor-pointer'>
                          Change
                        </span>
                      </p>
                      <p className='text-slate-600 text-sm'>Email to nicolas@email.com</p>
                    </div>
                  )}
                </div>
                {products.map((p, i) => (
                  <div key={i} className='flex bg-white p-4 flex-col gap-2'>
                    <div className='flex justify-start items-center'>
                      <h2 className='text-slate-600 font-bold'>{p.shopName}</h2>
                    </div>

                    {p.products.map((pt, i) => (
                      <div key={i} className='w-full flex flex-wrap'>
                        <div className='flex sm:w-full gap-2 w-7/12'>
                          <div className='flex gap-2 justify-start items-center'>
                            <img src={pt.productInfo.images[0]} alt='products' className='w-[80px] h-[80px]' />
                            <div className='pr-4 text-slate-600'>
                              <h2 className='font-semibold'>{pt.productInfo.name}</h2>
                              <span className='text-sm'>Brand: {pt.productInfo.brand}</span>
                            </div>
                          </div>
                        </div>

                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                          <div className='pl-4 sm:pl-0'>
                            <h2 className='text-lg text-orange-500'>
                              $
                              {pt.productInfo.price -
                                Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}
                            </h2>
                            <p className='line-through'>${pt.productInfo.price}</p>
                            <p>-{pt.productInfo.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className='w-[33%] md-lg:w-full'>
              <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                  <h2 className='text-xl font-bold'>Order Summary</h2>
                  <div className='flex justify-between items-center'>
                    <span>Items Total ({items})</span>
                    <span>${price}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Delivery Fee</span>
                    <span>${shippingFee}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Total Payment</span>
                    <span>${price + shippingFee}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span>Total</span>
                    <span className='text-lg text-[#059473]'>${price + shippingFee}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={!res}
                    className={`px-5 py-[6px] rounded-sm ${
                      res ? "bg-red-500 hover:shadow-red-500/50 hover:shadow-lg" : "bg-red-300 cursor-not-allowed"
                    }  text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
