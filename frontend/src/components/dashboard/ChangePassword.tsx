import { messageClear, updatePassword } from "@/store/reducers/authReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const { userInfo, successMessage, errorMessage } = useSelector((state) => state.auth);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setPassword({
      ...password,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.oldPassword) {
      return toast.error("Please enter old password");
    }
    if (!password.newPassword) {
      return toast.error("Please enter new password");
    }
    if (!password.confirmPassword) {
      return toast.error("Please enter confirm password");
    }
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Password does not match");
    }
    dispatch(
      updatePassword({ email: userInfo.email, oldPassword: password.oldPassword, newPassword: password.newPassword })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  return (
    <div className='p-4 bg-white'>
      <h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 mb-2'>
          <label>Email</label>
          <input
            value={userInfo.email}
            disabled
            className='outline-none px-3 py-1 border rounded-md text-slate-600 disabled:text-slate-400'
          />
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='oldPassword'>Old Password</label>
          <input
            type='password'
            name='oldPassword'
            id='oldPassword'
            value={password.oldPassword}
            onChange={handleChange}
            // placeholder='Old Password'
            className='outline-none px-3 py-1 border rounded-md text-slate-600'
          />
        </div>

        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='newPassword'>New Password</label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            value={password.newPassword}
            onChange={handleChange}
            // placeholder='New Password'
            className='outline-none px-3 py-1 border rounded-md text-slate-600'
          />
        </div>

        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={password.confirmPassword}
            onChange={handleChange}
            // placeholder='Confirm Password'
            className='outline-none px-3 py-1 border rounded-md text-slate-600'
          />
        </div>
        <div>
          <button type='submit' className='px-8 py-2 bg-[#059473] hover:bg-[#059473]/90 text-white rounded-md'>
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
