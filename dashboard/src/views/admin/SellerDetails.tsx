import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeller, messageClear, sellerStatusUpdate } from "../../store/reducers/sellerReducer";
import toast from "react-hot-toast";

export default function SellerDetails() {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();

  const [status, setStatus] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sellerStatusUpdate({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    dispatch(getSeller(sellerId));
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-lg font-bold mb-3'>Seller Detail</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-[#d0d2d6]'>
          <div className='w-3/12 flex justify-center items-center py-3'>
            <div>
              {seller.image ? (
                <img src={seller.image} alt='seller image' className='w-full h-[230px]' />
              ) : (
                <span>Image Not Uploaded</span>
              )}
            </div>
          </div>

          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Basic Info</h2>
              </div>
              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Name: </span>
                  <span>{seller.name}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Email: </span>
                  <span>{seller.email}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Role: </span>
                  <span>{seller.role}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Status: </span>
                  <span>{seller.status}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Payment Status: </span>
                  <span>{seller.payment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Address</h2>
              </div>
              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Shop Name: </span>
                  <span>{seller.shopInfo?.shopName}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Division: </span>
                  <span>{seller.shopInfo?.division}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>District: </span>
                  <span>{seller.shopInfo?.district}</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>State: </span>
                  <span>{seller.shopInfo?.subDistrict}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-4 py-3'>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                name=''
                id=''
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
              >
                <option value=''>--Select Status--</option>
                <option value='active'>Active</option>
                <option value='deactive'>Deactive</option>
              </select>
              <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
