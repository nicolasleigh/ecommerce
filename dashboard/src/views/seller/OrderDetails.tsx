import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSellerOrder, messageClear, sellerOrderStatusUpdate } from "../../store/reducers/orderReducer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { order, successMessage, errorMessage } = useSelector((state) => state.order);
  console.log(order);
  const statusUpdate = (value) => {
    dispatch(sellerOrderStatusUpdate({ orderId, info: { status: value } }));
    setStatus(value);
  };

  const getShortObjectID = (id: string) => {
    const len = id?.length;
    return id?.substring(len - 5, len).toUpperCase();
  };

  useEffect(() => {
    dispatch(getSellerOrder(orderId));
  }, [orderId]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    setStatus(order.deliveryStatus);
  }, [order]);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 border rounded-md'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl font-semibold'>Order Details</h2>
          <Select value={status} onValueChange={statusUpdate}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='processing'>Processing</SelectItem>
              <SelectItem value='warehouse'>Warehouse</SelectItem>
              <SelectItem value='placed'>Placed</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='p-4 space-y-3'>
          <div className='flex items-center gap-4 '>
            <Label>Order ID: </Label>
            <span className=''>#{getShortObjectID(order._id)}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Order Creation Time: </Label>
            <span>{order.date}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Customer Name: </Label>
            <span>{order.shippingInfo?.name}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Customer Phone Number: </Label>
            <span>{order.shippingInfo?.phone}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Payment Status: </Label>
            <Badge>{order.paymentStatus}</Badge>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Price: </Label>
            <span>{order.price} ¥</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Products: </Label>
            <div className='flex gap-2'>
              {order?.products?.map((p, i) => (
                <div key={i} className='border py-2 px-3  rounded-md'>
                  <div className='flex gap-5 items-center'>
                    <img src={p.images[0]} alt='produce image' className='w-28 h-28 ' />
                    <div>
                      <div className='space-x-2'>
                        <Label>Product ID:</Label>
                        <span className='capitalize text-sm'>#{getShortObjectID(p._id)}</span>
                      </div>
                      <div className='space-x-2'>
                        <Label>Category:</Label>
                        <span className='capitalize text-sm'>{p.category}</span>
                      </div>
                      <div className='space-x-2'>
                        <Label>Name:</Label>
                        <span className='capitalize text-sm'>{p.name}</span>
                      </div>
                      <div className='space-x-2'>
                        <Label>Quantity:</Label>
                        <span className='capitalize text-sm'>{p.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-[30%]'>
              <div className='pr-3  text-lg'>
                {/* {order?.products?.map((p, i) => (
                  <div key={i} className='mt-4 flex flex-col gap-4 border rounded-md'>
                    <div className=''>
                      <div className='flex gap-3'>
                        <img src={p.images[0]} alt='produce image' className='w-[50px] h-[50px]' />
                        <div>
                          <h2>{p.name}</h2>
                          <p>
                            <span>Brand: </span>
                            <span>{p.brand} </span>
                            <span className='text-lg'>Quantity: {p.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
