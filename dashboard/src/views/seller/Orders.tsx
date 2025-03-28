import { useEffect, useState } from "react";
import Search from "../components/Search";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../store/reducers/orderReducer";
import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/OrderColumn";

export default function Orders() {
  const [perPage, setPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(myOrders);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(getSellerOrders(obj));
  }, [searchValue, currentPage, perPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <DataTable columns={columns} data={myOrders} />
      {/* <h1 className='text-black mb-3 font-semibold text-lg'>Orders</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  Order Id
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Order Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Date
                </th>

                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => {
                return (
                  <tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      #{d._id}
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      ${d.price}
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      {d.paymentStatus}
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      {d.deliveryStatus}
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      {d.date}
                    </td>

                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <div className='flex justify-start items-center gap-4'>
                        <Link
                          to={`/seller/dashboard/order/details/${d._id}`}
                          className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
