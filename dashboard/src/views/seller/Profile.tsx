import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaImages } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, profileImageUpload, profileInfoAdd, updatePassword } from "../../store/reducers/authReducer";

export default function Profile() {
  const [openEdit, setOpenEdit] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage, imageLoader } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    sellerName: userInfo.name,
  });
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const addImage = (e) => {
    if (e.target.files.length) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profileImageUpload(formData));
    }
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
  }, [successMessage, errorMessage]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.sellerName) {
      return toast.error("Seller name cannot be empty");
    }
    dispatch(profileInfoAdd(state));
    setOpenEdit(false);
  };

  const handleChangePass = (e) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPass = (e) => {
    e.preventDefault();
    if (!pass.oldPassword) {
      return toast.error("Old password cannot be empty");
    }
    if (!pass.newPassword) {
      return toast.error("New password cannot be empty");
    }
    dispatch(updatePassword(pass));
  };

  const clear = () => {
    setPass({
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full flex flex-wrap gap-2'>
        <div className='w-full md:w-[49%]'>
          <div className='w-full border  rounded-md '>
            <div className='flex justify-center items-center '>
              {userInfo?.image ? (
                <label
                  htmlFor='img'
                  className='h-[200px] rounded-md w-[200px] relative mt-5 cursor-pointer overflow-hidden'
                >
                  <img src={userInfo.image} alt='image' className='w-full' />
                  {imageLoader && (
                    <div className='bg-slate-600 rounded-md absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                      <span>
                        <Loader size={50} className='animate-spin' />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor='img'
                  className='flex items-center text-muted-foreground hover:border-gray-400 rounded-md justify-center flex-col h-[200px] w-[200px] cursor-pointer border   relative'
                >
                  <span>
                    <FaImages />
                  </span>
                  <span>Select Image</span>
                  {imageLoader && (
                    <div className='bg-slate-600 rounded-md absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                      <span>
                        <Loader size={50} className='animate-spin' />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input onChange={addImage} type='file' className='hidden' id='img' />
            </div>

            <div className='px-2 md:px-5 py-4'>
              <div className='flex justify-between text-sm flex-col gap-4 p-4 border rounded-md relative'>
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                  <DialogTrigger>
                    <span className='p-[6px] hover:bg-muted border rounded  absolute right-2 top-2 cursor-pointer'>
                      <PencilIcon className='w-4 h-4' />
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Seller Name</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                      <div>
                        <Label htmlFor='sellerName'>Seller Name</Label>
                        <Input name='sellerName' id='sellerName' value={state.sellerName} onChange={handleChange} />
                      </div>
                      <Button className='' variant='outline'>
                        Update
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className='flex gap-2'>
                  <span>Name:</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className='flex gap-2'>
                  <span>Email:</span>
                  <span>{userInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full md:w-[49%] border rounded-md'>
          <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
            <div className='rounded-md  p-4'>
              <h1 className=' text-lg mb-3 font-semibold'>Change Password</h1>
              <form className='space-y-4' onSubmit={handleSubmitPass}>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input type='email' name='email' id='email' value={userInfo.email} disabled />
                </div>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <Label htmlFor='oldPassword'>Old Password</Label>
                  <Input
                    type='password'
                    name='oldPassword'
                    id='oldPassword'
                    placeholder=''
                    value={pass.oldPassword}
                    onChange={handleChangePass}
                  />
                </div>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <Input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    placeholder=''
                    value={pass.newPassword}
                    onChange={handleChangePass}
                  />
                </div>
                <div className='space-x-3'>
                  <Button variant='outline' type='submit' disabled={loader}>
                    Update
                  </Button>
                  <Button variant='outline' onClick={clear} type='reset' disabled={loader}>
                    Clear
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
