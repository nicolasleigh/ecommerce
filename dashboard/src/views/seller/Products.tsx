import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/ProductColumn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/reducers/productReducer";

export default function Products() {
  const [perPage, setPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);
  // console.log(products);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getProducts(obj));
  }, [searchValue, currentPage, perPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <DataTable
        columns={columns}
        data={products}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        showSearch
      />
    </div>
  );
}
