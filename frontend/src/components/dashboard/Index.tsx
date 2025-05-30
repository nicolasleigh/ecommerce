import { getShortObjectID } from "@/utils/helper";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { RiCheckboxIndeterminateFill, RiMoneyCnyBoxFill, RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";

export default function Index() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);

  const redirect = (order) => {
    return toast.error("Unavailable to pay right now");
  };

  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
            <span className='text-xl text-green-800'>
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className='flex flex-col justify-start items-start text-slate-600'>
            <h2 className='text-3xl font-bold'>{totalOrder}</h2>
            <span>Orders</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
            <span className='text-xl text-green-800'>
              <RiMoneyCnyBoxFill />
            </span>
          </div>
          <div className='flex flex-col justify-start items-start text-slate-600'>
            <h2 className='text-3xl font-bold'>{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
            <span className='text-xl text-green-800'>
              <RiCheckboxIndeterminateFill />
            </span>
          </div>
          <div className='flex flex-col justify-start items-start text-slate-600'>
            <h2 className='text-3xl font-bold'>{cancelledOrder}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>

      <div className='bg-white p-5 mt-5 rounded-md'>
        <h2 className='text-xl font-semibold text-slate-600'>Recent Orders</h2>
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
                {recentOrders.map((order, i) => (
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
    </div>
  );
}
