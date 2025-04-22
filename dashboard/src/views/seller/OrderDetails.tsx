import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSellerOrder, messageClear, sellerOrderStatusUpdate } from "../../store/reducers/orderReducer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getShortObjectID } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import moment from "moment";

export default function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { order, successMessage, errorMessage } = useSelector((state) => state.order);
  console.log(order);
  const statusUpdate = (value) => {
    dispatch(sellerOrderStatusUpdate({ orderId, info: { status: value } }));
    setStatus(value);
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
    setStatus(order.paymentStatus);
  }, [order]);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 border rounded-md'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl font-semibold'>Order Details</h2>
          <div className='flex flex-col sm:flex-row gap-0 sm:gap-6 items-center'>
            <Button variant='link' onClick={() => navigate(-1)} className='p-0 underline hover:no-underline'>
              &larr; Go back
            </Button>
            <Select value={status} onValueChange={statusUpdate}>
              <SelectTrigger className='w-[140px]'>
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='unpaid'>Unpaid</SelectItem>
                <SelectItem value='paid'>Paid</SelectItem>
                <SelectItem value='refund'>Refund</SelectItem>
                <SelectItem value='cancelled'>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='p-4 space-y-3'>
          <div className='flex items-center gap-4 '>
            <Label>Order ID: </Label>
            <span className=''>{getShortObjectID(order._id)}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Order Created At: </Label>
            <span>{moment(order.date).format("lll")}</span>
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
            <Badge className='uppercase font-light'>{order.paymentStatus}</Badge>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Price: </Label>
            <span>{order.price} ¥</span>
          </div>
          <div className='flex flex-col  gap-4  '>
            <Label>Products: </Label>
            <div className='flex flex-wrap gap-2 ml-4'>
              {order?.products?.map((p, i) => (
                <div key={i} className='border py-2 px-3  rounded-md'>
                  <div className='flex gap-5 items-center'>
                    <img src={p.images[0]} alt='produce image' className='w-28 h-28 ' />
                    <div>
                      <div className='space-x-2'>
                        <Label>Product ID:</Label>
                        <span className='capitalize text-sm'>{getShortObjectID(p._id)}</span>
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
        </div>
      </div>
    </div>
  );
}
