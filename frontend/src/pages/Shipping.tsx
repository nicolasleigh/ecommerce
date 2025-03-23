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
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    name: userInfo.name,
    email: userInfo.email,
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = state;
    if (name && email && phone) {
      setRes(true);
    }
  };
  console.log(products);

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

      <section className="bg-[url('/images/banner/shop.webp')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shipping Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Shipping</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Cart</span>
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
                  <h2 className='text-slate-600 text-2xl font-bold pb-3'>Customer Information</h2>

                  {!res && (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='name' className='font-semibold text-sm'>
                              Full Name
                            </label>
                            <input
                              value={state.name}
                              onChange={handleChange}
                              type='text'
                              name='name'
                              id='name'
                              // placeholder='Full Name'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#059473] rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='phone' className='font-semibold text-sm'>
                              Phone Number
                            </label>
                            <input
                              value={state.phone}
                              onChange={handleChange}
                              type='text'
                              name='phone'
                              id='phone'
                              // placeholder='Phone'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#059473] rounded-md'
                            />
                          </div>
                        </div>

                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                          <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label htmlFor='email' className='font-semibold text-sm'>
                              Email Address
                            </label>
                            <input
                              value={state.email}
                              onChange={handleChange}
                              type='email'
                              name='email'
                              id='email'
                              // placeholder='Email'
                              className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#059473] rounded-md'
                            />
                          </div>
                          <div className='flex flex-col gap-1 mt-8 mb-2 w-full'>
                            <button className='px-3 py-[6px] rounded-sm  bg-[#059473] hover:bg-[#059473]/90 text-white'>
                              Save Change
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {res && (
                    <div className='flex flex-col gap-3'>
                      <div className='flex gap-2 items-center'>
                        <h2 className='text-slate-600 font-semibold '>Customer Full Name: </h2>
                        <span className='bg-blue-200 text-blue-800 px-2 rounded-sm '>{state.name}</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <h2 className='text-slate-600 font-semibold '>Customer Phone Number: </h2>
                        <span className='bg-blue-200 text-blue-800 px-2 rounded-sm '>{state.phone}</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <h2 className='text-slate-600 font-semibold '>Customer Email Address: </h2>
                        <span className='bg-blue-200 text-blue-800 px-2 rounded-sm '>{state.email}</span>
                      </div>
                      <div>
                        <button
                          onClick={() => setRes(false)}
                          className=' bg-[#059473] hover:bg-[#059473]/90 text-green-50 py-1 px-2 rounded-sm'
                        >
                          Change Info
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {products.map((p, i) => (
                  <div key={i} className='flex bg-white rounded-sm p-4 flex-col gap-2'>
                    {p.products.map((pt, i) => (
                      <div key={i} className='w-full flex flex-wrap'>
                        <div className='flex sm:w-full gap-2 w-7/12'>
                          <div className='flex gap-2 justify-start items-center'>
                            <img src={pt.productInfo.images[0]} alt='products' className='w-[80px] h-[80px]' />
                            <div className='pr-4 text-slate-600'>
                              <h2 className='font-semibold capitalize'>{pt.productInfo.name}</h2>
                              <span className='text-sm capitalize'>Category: {pt.productInfo.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                          <div className='pl-4 sm:pl-0'>
                            <h2 className='text-[#059473] text-sm flex gap-2 items-center'>
                              <span>After Discount:</span>
                              {pt.productInfo.price -
                                Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}
                              ¥
                            </h2>
                            <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                              <span className=''>Before Discount:</span>
                              <span className='line-through text-muted-foreground'>{pt.productInfo.price}¥</span>
                            </p>
                            <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                              <span>Discount:</span>
                              <span>{pt.productInfo.discount}%</span>
                            </p>
                            <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                              <span>Quantity:</span>
                              <span>{pt.quantity}</span>
                            </p>
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
                    <span>Total Items ({items})</span>
                    <span>{price}¥</span>
                  </div>
                  {/* <div className='flex justify-between items-center'>
                    <span>Delivery Fee</span>
                    <span>${shippingFee}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Total Payment</span>
                    <span>${price + shippingFee}</span>
                  </div> */}

                  <div className='flex justify-between items-center'>
                    <span>Total Payment</span>
                    <span className='text-lg text-[#059473]'>{price + shippingFee}¥</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={!res}
                    className={`px-5 py-[6px] rounded-sm ${
                      res ? "bg-red-500 hover:bg-red-600" : "bg-red-300 cursor-not-allowed"
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
