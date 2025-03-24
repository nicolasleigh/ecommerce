import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";
import { getShortObjectID } from "@/utils/helper";

export default function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, [orderId]);

  // console.log(myOrder);

  return (
    <div className='bg-white p-5 space-y-2 relative'>
      <Link
        to='/dashboard/my-orders'
        className='absolute right-5 text-sm underline hover:no-underline underline-offset-2 hover:text-slate-600'
      >
        View All Orders
      </Link>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Order ID:</span>
        <span className='font-semibold'>{getShortObjectID(myOrder._id)}</span>
      </div>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Order Created At:</span>
        <span className='font-semibold'>{myOrder.date}</span>
      </div>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Customer Name:</span>
        <span className='font-semibold'>{myOrder.shippingInfo?.name}</span>
      </div>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Order Price: </span>
        <span className='font-semibold'>{myOrder.price}¥</span>
      </div>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Payment Status: </span>
        <span
          className={`py-[2px] font-semibold px-3 rounded-sm uppercase  ${
            myOrder.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          } rounded-md`}
        >
          {myOrder.paymentStatus}
        </span>
      </div>
      <div className='space-x-2 text-sm'>
        <span className='text-muted-foreground'>Order Status: </span>
        <span
          className={`py-[2px] font-semibold px-3 rounded-sm uppercase ${
            myOrder.deliveryStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          } `}
        >
          {myOrder.deliveryStatus}
        </span>
      </div>

      <div className='space-x-2 text-sm space-y-2'>
        <h2 className='text-muted-foreground'>Order Products:</h2>
        <div className='flex gap-2 flex-col'>
          {myOrder.products?.map((p, i) => (
            <div key={i} className=''>
              <div className='flex gap-2 justify-start items-center text-slate-600 '>
                <div className='flex gap-2 border p-2 rounded-sm'>
                  <img src={p.images[0]} alt='product image' className='w-[55px] h-[55px]' />
                  <div className='flex text-sm flex-col justify-start items-start'>
                    <p className='space-x-2'>
                      <span className='text-muted-foreground '>Name:</span>
                      <span className='capitalize'>{p.name}</span>
                    </p>
                    <p className='space-x-2'>
                      <span className='text-muted-foreground '>Category:</span>
                      <span className='capitalize'>{p.category}</span>
                    </p>
                    <p className='space-x-2'>
                      <span className='text-muted-foreground '>Quantity:</span>
                      <span>{p.quantity}</span>
                    </p>
                  </div>
                  <div className='pl-2 flex flex-col  '>
                    <h2 className='text-[#059473] text-sm flex gap-2 items-center'>
                      <span>After Discount:</span>
                      {p.price - Math.floor((p.price * p.discount) / 100)}¥
                    </h2>
                    <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                      <span className=''>Before Discount:</span>
                      <span className='line-through text-muted-foreground'>{p.price}¥</span>
                    </p>
                    <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                      <span>Discount:</span>
                      <span>{p.discount}%</span>
                    </p>
                  </div>
                </div>
                {/* <div className='pl-2 flex flex-col border '>
                  <h2 className='text-[#059473] text-sm flex gap-2 items-center'>
                    <span>After Discount:</span>
                    {p.price - Math.floor((p.price * p.discount) / 100)}¥
                  </h2>
                  <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                    <span className=''>Before Discount:</span>
                    <span className='line-through text-muted-foreground'>{p.price}¥</span>
                  </p>
                  <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                    <span>Discount:</span>
                    <span>{p.discount}%</span>
                  </p>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
