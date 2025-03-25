import { DashboardChart } from "@/components/DashboardChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getLatestMessage } from "@/store/reducers/chatReducer";
import { getChartData, getDashboardStats, getLatestOrders } from "@/store/reducers/orderReducer";
import { getShortObjectID } from "@/utils/utils";
import { Banknote, ShoppingCart, SquareArrowOutUpRight, SquareLibrary, SquareUserRound } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  const { latestOrders, dashboardStats, chartData } = useSelector((state) => state.order);
  const { latestMessages } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestOrders(5));
    dispatch(getDashboardStats());
    dispatch(getLatestMessage(4));
    dispatch(getChartData());
  }, []);
  console.log(latestMessages);

  return (
    <div className='px-2 md:px-7 py-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <Card className='flex items-center justify-between rounded-md shadow-md'>
          <div>
            <CardHeader className='text-2xl font-bold pb-0'>
              {dashboardStats.unpaidStats + dashboardStats.paidStats} ¥
            </CardHeader>
            <CardContent className='text-sm font-bold'>Total Sale</CardContent>
          </div>
          <CardFooter className='p-0 pr-6'>
            <div className='w-[40px] h-[40px] rounded-full  flex justify-center items-center text-xl'>
              <Banknote className=' ' size={40} strokeWidth={1} />
            </div>
          </CardFooter>
        </Card>

        <Card className='flex items-center justify-between rounded-md shadow-md'>
          <div>
            <CardHeader className='text-2xl font-bold pb-0'>{dashboardStats.productCount}</CardHeader>
            <CardContent className='text-sm font-bold'>Products</CardContent>
          </div>
          <CardFooter className='p-0 pr-6'>
            <div className='w-[40px] h-[40px] rounded-full  flex justify-center items-center text-xl'>
              <ShoppingCart className='' size={40} strokeWidth={1} />
            </div>
          </CardFooter>
        </Card>

        <Card className='flex items-center justify-between rounded-md shadow-md'>
          <div>
            <CardHeader className='text-2xl font-bold pb-0'>{dashboardStats.orderCount}</CardHeader>
            <CardContent className='text-sm font-bold'>Orders</CardContent>
          </div>
          <CardFooter className='p-0 pr-6'>
            <div className='w-[40px] h-[40px] rounded-full  flex justify-center items-center text-xl'>
              <SquareLibrary className='' size={40} strokeWidth={1} />
            </div>
          </CardFooter>
        </Card>

        <Card className='flex items-center justify-between rounded-md shadow-md'>
          <div>
            <CardHeader className='text-2xl font-bold pb-0'>{dashboardStats.customerCount}</CardHeader>
            <CardContent className='text-sm font-bold'>Customers</CardContent>
          </div>
          <CardFooter className='p-0 pr-6'>
            <div className='w-[40px] h-[40px] rounded-full flex justify-center items-center text-xl'>
              <SquareUserRound className='' size={40} strokeWidth={1} />
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className='w-full flex flex-wrap mt-7'>
        <div className='w-full lg:w-7/12 lg:pr-3'>
          <DashboardChart chartData={chartData} />
        </div>

        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <div className='w-full border p-4 rounded-md shadow-md'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-lg  pb-3'>Recent Customer Message</h2>
              <Link to={`/seller/dashboard/chat-customer`} className='font-semibold text-sm '>
                View All
              </Link>
            </div>

            <div className='flex flex-col gap-2 pt-6 '>
              <ol className='relative  border-slate-600 ml-4'>
                {latestMessages &&
                  latestMessages.length !== 0 &&
                  latestMessages.map((item, i) => {
                    const createdAt = new Date(item.createdAt).getTime();
                    const nowTime = Date.now();
                    const diff = new Date(nowTime - createdAt);
                    const day = diff.getUTCDate() - 1;

                    return (
                      <li key={i} className='mb-3 ml-6'>
                        <div className='flex absolute -left-5  justify-center items-center w-10 h-10 p-[6px] bg-gray-100 rounded-full z-20'>
                          <img
                            src='/customerDefaultAvatar.jpg'
                            alt='customer default avatar'
                            className='w-full rounded-full h-full shadow-lg'
                          />
                        </div>
                        <div className='p-3  rounded-lg border border-slate-600 shadow-sm'>
                          <div className='flex justify-between items-center mb-2'>
                            <Link to={`/seller/dashboard/chat-customer/${item.senderId}`} className='font-normal'>
                              {item.senderName}
                            </Link>
                            {day ? (
                              <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'> {day} days ago</time>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className='p-2 text-xs font-normal  rounded-lg border border-slate-400'>
                            {item.message}
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full p-4 border shadow-md rounded-md mt-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-lg  pb-3'>Recent Orders</h2>
          <Link to='/seller/dashboard/orders' className='font-semibold text-sm '>
            View All
          </Link>
        </div>

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left '>
            <thead className='text-sm  uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  Order ID
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Customer
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Detail
                </th>
              </tr>
            </thead>

            <tbody>
              {latestOrders &&
                latestOrders.length !== 0 &&
                latestOrders.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                        {getShortObjectID(item._id)}
                      </td>
                      <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                        {item.price} ¥
                      </td>
                      <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                        {item?.shippingInfo?.name}
                      </td>
                      <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                        <Badge className='uppercase font-light'>{item.paymentStatus}</Badge>
                      </td>
                      <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                        <Link to={`/seller/dashboard/order/details/${item._id}`}>
                          <SquareArrowOutUpRight strokeWidth={1.3} size={20} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
