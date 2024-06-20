import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div className='min-w-full min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#fff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <h2 className='text-xl mb-3 font-bold '>Welcome</h2>
          <p className='text-sm mb-3 font-medium'>Please Login your account</p>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='email'>Email</label>
              <input
                value={state.email}
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Email'
                id='email'
                required
                className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                value={state.password}
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                required
                className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
              />
            </div>

            <button className='bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
              Sign in
            </button>

            <div className='flex items-center mb-3 gap-3 justify-center'>
              <p>
                Don't Have an Account?{" "}
                <Link className='font-bold' to='/signup'>
                  Sign up
                </Link>
              </p>
            </div>

            <div className='w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
            </div>

            <div className='flex justify-center items-center gap-3'>
              <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
