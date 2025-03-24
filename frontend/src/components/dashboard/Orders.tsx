import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getShortObjectID } from "@/utils/helper";
import toast from "react-hot-toast";

export default function Orders() {
  const [state, setState] = useState("all");
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInfo.id }));
  }, [state]);

  const redirect = (order) => {
    return toast.error("Unavailable to pay right now");
    // let items = 0;
    // for (let i = 0; i < order.products.length; i++) {
    //   items = order.products[i].quantity + items;
    // }
    // navigate("/payment", {
    //   state: {
    //     price: order.price,
    //     items,
    //     orderId: order._id,
    //   },
    // });
  };

  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
        <div>
          <Select onValueChange={(value) => setState(value)}>
            <SelectTrigger>
              <SelectValue placeholder='Order Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='placed'>Placed</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
              <SelectItem value='warehouse'>Warehouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='pt-4'>
        <div className='relative overflow-x-auto rounded-md'>
          <table className='w-full text-sm text-left text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-200 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Order Id
                </th>
                <th scope='col' className='px-6 py-3'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  Payment Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Order Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, i) => (
                <tr key={i} className='bg-white border-b'>
                  <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    {getShortObjectID(order._id)}
                  </td>
                  <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    {order.price}¥
                  </td>
                  <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    <span className='uppercase bg-blue-200 py-[1px] text-blue-600 px-2 rounded-sm font-light'>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    <span className='uppercase bg-red-200 py-[1px] text-red-600 px-2 rounded-sm font-light'>
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    <Link to={`/dashboard/order/details/${order._id}`}>
                      <span className='bg-green-200 text-green-800  mr-2 px-3 py-[2px] rounded uppercase'>View</span>
                    </Link>
                    {order.paymentStatus !== "paid" && (
                      <span
                        onClick={() => redirect(order)}
                        className='bg-green-200 text-green-800  mr-2 px-3 py-[2px] rounded cursor-pointer uppercase'
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
