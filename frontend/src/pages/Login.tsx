import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loader, userInfo, successMessage, errorMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
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
        <div className='w-full justify-center items-center p-10'>
          <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
            <div className='px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Login</h2>
              <div>
                <form onSubmit={handleSubmit} className='text-slate-600'>
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
                    Login
                  </button>
                </form>

                <div className='flex justify-center items-center py-2'>
                  <div className='h-[1px] bg-slate-300 w-[90%]'></div>
                  <span className='px-3 text-slate-600'>Or</span>
                  <div className='h-[1px] bg-slate-300 w-[90%]'></div>
                </div>

                <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/40 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With Facebook</span>
                </button>

                <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-indigo-500/40 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Google</span>
                </button>
              </div>

              <div className='text-center text-slate-600 pt-1'>
                <p>
                  Don't Have an Account?{" "}
                  <Link className='text-blue-500' to='/register'>
                    Register
                  </Link>
                </p>
              </div>
            </div>

            <div className='w-full h-full py-4 pr-4'>
              <img src='/images/login.jpg' alt='login image' />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
