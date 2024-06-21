import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import logoImage from "../../../public/logo.png";
import { admin_login, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage]);

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

            <button
              disabled={loader}
              className='bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
            >
              {loader ? <PropagateLoader color='white' cssOverride={overrideStyle} /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
