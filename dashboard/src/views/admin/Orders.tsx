import { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { LuArrowDownSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../store/reducers/orderReducer";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  const { myOrders, totalOrder } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getAdminOrders(obj));
  }, [searchValue, currentPage, perPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center'>
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            name=''
            id=''
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type='text'
            placeholder='Search...'
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6]'
          />
        </div>

        <div className='relative mt-5 overflow-x-auto'>
          <div className='w-full text-sm text-left text-[#d0d2d6]'>
            <div className='text-sm uppercase border-b border-slate-700'>
              <div className='flex justify-between items-center'>
                <div className='py-3 w-[25%] font-bold'>Order id</div>
                <div className='py-3 w-[13%] font-bold'>Price</div>
                <div className='py-3 w-[18%] font-bold'>Payment Status</div>
                <div className='py-3 w-[18%] font-bold'>Order Status</div>
                <div className='py-3 w-[18%] font-bold'>Action</div>
                <div className='py-3 w-[8%] font-bold'>
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>
            {myOrders.map((o, i) => (
              <div className='text-[#d0d2d6] '>
                <div className='flex justify-between items-start border-b border-slate-700'>
                  <div className='py-3 w-[25%] font-medium whitespace-nowrap'>#{o._id}</div>
                  <div className='py-3 w-[13%] font-medium'>${o.price}</div>
                  <div className='py-3 w-[18%] font-medium'>{o.paymentStatus}</div>
                  <div className='py-3 w-[18%] font-medium'>{o.deliveryStatus}</div>
                  <div className='py-3 w-[18%] font-medium'>
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>View</Link>
                  </div>
                  <div onClick={(e) => setShow(o._id)} className='py-3 w-[8%] font-medium'>
                    <LuArrowDownSquare />
                  </div>
                </div>

                <div className={show === o._id ? "block border-b border-slate-700 bg-[#8288ed]" : "hidden"}>
                  {o.suborder.map((so, i) => (
                    <div className='flex justify-start items-start  border-slate-700'>
                      <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>#{so._id}</div>
                      <div className='py-3 w-[13%] font-medium'>${so.price}</div>
                      <div className='py-3 w-[18%] font-medium'>{so.paymentStatus}</div>
                      <div className='py-3 w-[18%] font-medium'>{so.deliveryStatus}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {totalOrder <= perPage ? (
          ""
        ) : (
          <div className='w-full flex justify-end mt-4 '>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              perPage={perPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
