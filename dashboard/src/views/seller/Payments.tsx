import { Badge } from "@/components/ui/badge";
import { getAllOrders, getPaymentStats } from "@/store/reducers/orderReducer";
import { getShortObjectID } from "@/utils/utils";
import { ChartColumnDecreasing, CreditCard, SquareArrowOutUpRight, SwitchCamera, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { SearchOrder } from "./SearchOrder";

// function handleOnWheel({ deltaY }) {
//   console.log("handleOnWheel", deltaY);
// }

// const outerElementType = forwardRef((props, ref) => {
//   return <div ref={ref} onWheel={handleOnWheel} {...props} />;
// });

export default function Payments() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {
    allOrders,
    paymentStats,
  }: {
    allOrders: [];
    paymentStats: { unpaidStats: number; paidStats: number; refundStats: number; refundRate: number };
  } = useSelector((state) => state.order);
  const [resultOrder, setResultOrder] = useState([]);
  const navigate = useNavigate();

  // console.log(allOrders);

  const searchOrderMap = allOrders.map((e, i) => ({
    label: getShortObjectID(e._id),
    value: e._id,
  }));

  const searchOrder = (e) => {
    e.preventDefault();
    console.log(search);
    const filter = allOrders.filter((item) => item._id.startsWith(search.toLowerCase()));
    setResultOrder(filter);
  };

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getPaymentStats());
  }, []);
  // console.log(paymentStats);

  useEffect(() => {
    if (!search) {
      setResultOrder(allOrders);
    }
  }, [search]);

  const Row = ({ index, style }) => {
    const [status, setStatus] = useState("");
    const id = allOrders[index]?._id;
    const customerName = allOrders[index]?.shippingInfo?.name;
    const price = allOrders[index]?.price;
    const paymentStatus = allOrders[index]?.paymentStatus;

    // const statusUpdate = (value) => {
    //   setStatus(value);
    //   dispatch(sellerOrderStatusUpdate({ orderId: id, info: { status: value } }));
    // };

    useEffect(() => {
      setStatus(paymentStatus);
    }, []);

    return (
      <div
        style={style}
        className='flex text-sm  font-medium max-sm:font-normal max-sm:text-xs border-b border-x dark:border-gray-600 bg-muted '
      >
        <div className='w-[5%] p-2 max-sm:px-1 whitespace-nowrap'>{index + 1}</div>
        <div className='w-[22%] p-2 max-sm:px-1 whitespace-nowrap'>{getShortObjectID(id)}</div>
        <div className='w-[22%] p-2 max-sm:px-1 whitespace-nowrap'>{customerName}</div>
        <div className='w-[20%] p-2 max-sm:px-1 whitespace-nowrap'>{price} ¥</div>
        <div className='w-[22%]  flex items-center  whitespace-nowrap'>
          <Badge className='uppercase font-light max-sm:text-[9px] max-sm:px-1'>{status}</Badge>
        </div>
        {/* <div className='w-[25%] p-2 whitespace-nowrap'>{allOrders[index]?.createdAt}</div> */}
        <div className='w-[10%] p-2 max-sm:px-1 whitespace-nowrap'>
          <SquareArrowOutUpRight
            strokeWidth={1}
            size={20}
            onClick={() => navigate(`/order/details/${allOrders[index]?._id}`)}
            className='cursor-pointer'
          />
        </div>
      </div>
    );
  };

  return (
    <div className='px-2 md:px-7 py-5 flex flex-col gap-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <div className='flex border justify-between items-center p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-2xl font-bold'>{paymentStats.unpaidStats} ¥</h2>
            <span className='text-sm font-bold'>Unpaid Amount</span>
          </div>
          <div className='w-14 h-14 rounded-full flex justify-center items-center text-xl'>
            <Wallet className='w-10 h-10' strokeWidth={1} />
          </div>
        </div>

        <div className='flex border justify-between items-center p-5  rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-2xl font-bold'>{paymentStats.paidStats} ¥</h2>
            <span className='text-sm font-bold'>Paid Amount</span>
          </div>
          <div className='w-14 h-14 rounded-full  flex justify-center items-center text-xl'>
            <CreditCard className='w-10 h-10' strokeWidth={1} />
          </div>
        </div>

        <div className='flex border justify-between items-center p-5  rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-2xl font-bold'>{paymentStats.refundStats} ¥</h2>
            <span className='text-sm font-bold'>Refund Amount</span>
          </div>
          <div className='w-14 h-14 rounded-full  flex justify-center items-center text-xl'>
            <SwitchCamera className='w-10 h-10' strokeWidth={1} />
          </div>
        </div>

        <div className='flex border justify-between items-center p-5  rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-2xl font-bold'>{paymentStats.refundRate} %</h2>
            <span className='text-sm font-bold'>Refund Rate</span>
          </div>
          <div className='w-14 h-14 rounded-full  flex justify-center items-center text-xl'>
            <ChartColumnDecreasing className='w-10 h-10' strokeWidth={1} />
          </div>
        </div>
      </div>
      <SearchOrder orders={searchOrderMap} />

      <div className='w-full '>
        <div className=' border rounded-md p-5 max-sm:p-1'>
          <div>
            <h2 className='text-lg font-semibold pb-4'>Orders</h2>
            <div className='w-full overflow-x-auto'>
              <div className='flex border uppercase text-xs font-bold max-sm:font-normal min-w-[340px]  rounded-t-md'>
                <div className='w-[5%] p-2 max-sm:px-1'>No.</div>
                <div className='w-[22%] p-2 max-sm:px-1'>ID</div>
                <div className='w-[22%] p-2 max-sm:px-1'>Customer</div>
                <div className='w-[20%] p-2 max-sm:px-1'>Price</div>
                <div className='w-[22%] p-2 max-sm:px-1'>Status</div>
                {/* <div className='w-[25%] p-2'>Date</div> */}
                <div className='w-[10%] p-2 max-sm:hidden'>Detail</div>
              </div>
              {
                <FixedSizeList
                  // style={{ minWidth: "340px" }}
                  className='List'
                  height={350}
                  itemCount={allOrders.length}
                  itemSize={35}
                  // width={1100}
                  // outerElementType={outerElementType}
                >
                  {Row}
                </FixedSizeList>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
