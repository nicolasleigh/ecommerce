import { getAllOrders, sellerOrderStatusUpdate } from "@/store/reducers/orderReducer";
import { forwardRef, useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { SearchOrder } from "./SearchOrder";
import { getShortObjectID } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Eye, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => {
  return <div ref={ref} onWheel={handleOnWheel} {...props} />;
});

export default function Payments() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { allOrders }: { allOrders: [] } = useSelector((state) => state.order);
  const [resultOrder, setResultOrder] = useState([]);
  const navigate = useNavigate();

  console.log(allOrders);

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
  }, []);

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

    const statusUpdate = (value) => {
      setStatus(value);
      dispatch(sellerOrderStatusUpdate({ orderId: id, info: { status: value } }));
      // dispatch(getAllOrders());
    };

    useEffect(() => {
      setStatus(allOrders[index]?.paymentStatus);
    }, [index]);
    console.log(index, status);

    return (
      <div style={style} className='flex text-sm  font-medium border-b border-x dark:border-gray-600 bg-muted '>
        <div className='w-[5%] p-2 whitespace-nowrap'>{index + 1}</div>
        <div className='w-[22%] p-2 whitespace-nowrap'>{getShortObjectID(id)}</div>
        <div className='w-[22%] p-2 whitespace-nowrap'>{customerName}</div>
        <div className='w-[22%] p-2 whitespace-nowrap'>{price} ¥</div>
        <div className='w-[22%]  whitespace-nowrap'>
          <Select value={status} onValueChange={statusUpdate}>
            <SelectTrigger
              className='w-[120px] rounded-none border-none shadow-none p-0  h-[34px] focus:ring-0'
              noIcon={true}
            >
              <Badge className='uppercase font-light '>{status}</Badge>
              <ChevronDown size={18} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='unpaid'>Unpaid</SelectItem>
              <SelectItem value='paid'>Paid</SelectItem>
              <SelectItem value='refund'>Refund</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {/* <Badge className='uppercase font-light '>{allOrders[index]?.paymentStatus}</Badge> */}
        </div>
        {/* <div className='w-[25%] p-2 whitespace-nowrap'>{allOrders[index]?.createdAt}</div> */}
        <div className='w-[5%] p-2 whitespace-nowrap'>
          <SquareArrowOutUpRight
            strokeWidth={1}
            size={20}
            onClick={() => navigate(`/seller/dashboard/order/details/${allOrders[index]?._id}`)}
            className='cursor-pointer'
          />
        </div>
      </div>
    );
  };

  return (
    <div className='px-2 md:px-7 py-5 flex flex-col gap-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-2xl font-bold'>$3456</h2>
            <span className='text-sm font-bold'>Unpaid Amount</span>
          </div>
          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-2xl font-bold'>$150</h2>
            <span className='text-sm font-bold'>Paid Amount</span>
          </div>
          <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
            <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-2xl font-bold'>$100</h2>
            <span className='text-sm font-bold'>Refund Amount</span>
          </div>
          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-2xl font-bold'>10%</h2>
            <span className='text-sm font-bold'>Refund Rate</span>
          </div>
          <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl'>
            <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>
      <SearchOrder orders={searchOrderMap} />

      <div className='w-full '>
        <div className=' border rounded-md p-5'>
          <div>
            <h2 className='text-lg pb-4'>Pending Request</h2>
            <div className='w-full overflow-x-auto'>
              <div className='flex border uppercase text-xs font-bold min-w-[340px] rounded-t-md'>
                <div className='w-[5%] p-2'>No.</div>
                <div className='w-[22%] p-2'>ID</div>
                <div className='w-[22%] p-2'>Customer</div>
                <div className='w-[22%] p-2'>Price</div>
                <div className='w-[22%] p-2 '>Status</div>
                {/* <div className='w-[25%] p-2'>Date</div> */}
                <div className='w-[5%] p-2'>Detail</div>
              </div>
              {
                <FixedSizeList
                  style={{ minWidth: "340px" }}
                  className='List'
                  height={350}
                  itemCount={allOrders.length}
                  itemSize={35}
                  outerElementType={outerElementType}
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
