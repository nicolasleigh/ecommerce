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

  const { myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(myOrders);

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
    </div>
  );
}
