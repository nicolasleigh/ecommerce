import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { customer_register, messageClear } from "../store/reducers/authReducer";

export default function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loader, userInfo, errorMessage, successMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <Loader className='animate-spin' width={50} height={50} />
        </div>
      )}
      <Header />

      <div className='bg-slate-200 mt-4'>
        <div className='w-full justify-center items-center p-10 sm:p-2'>
          <div className='grid grid-cols-2 sm:grid-cols-1 w-[60%] lg:w-[80%] md:w-full mx-auto bg-white rounded-md'>
            <div className='px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold mb-2'>Register</h2>
              <div>
                <form onSubmit={handleSubmit} className='text-slate-600 space-y-5'>
                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='name'>Name</label>
                    <input
                      value={state.name}
                      onChange={handleChange}
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                      required
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                    />
                  </div>
                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                      value={state.email}
                      onChange={handleChange}
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      required
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                    />
                  </div>
                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                      value={state.password}
                      onChange={handleChange}
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Password'
                      required
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                    />
                  </div>
                  <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>
                    Register
                  </button>
                </form>
              </div>

              <div className='text-center text-slate-600 mt-2'>
                <p>
                  You Have No Account?{" "}
                  <Link className='text-blue-500' to='/login'>
                    Login
                  </Link>
                </p>
              </div>
            </div>

            <div className='w-full h-full py-4 pr-4 sm:hidden'>
              <img src='/images/login.jpg' alt='login image' />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
