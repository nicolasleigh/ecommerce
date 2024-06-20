import { ChangeEvent, FormEvent, useState } from "react";
import logoImage from "../../../public/logo.png";

export default function AdminLogin() {
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
          <div className='h-[70px] flex justify-center items-center'>
            <div className='w-[180px] h-[50px]'>
              <img className='w-full h-full' src={logoImage} alt='logo image' />
            </div>
          </div>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
