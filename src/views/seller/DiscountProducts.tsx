import { useState } from "react";
import Search from "../components/Search";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DiscountProducts() {
  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-black mb-3 font-semibold text-lg'>Discount Products</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  No.
                </th>
                <th scope='col' className='py-3 px-4'>
                  Image
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Category
                </th>
                <th scope='col' className='py-3 px-4'>
                  Brand
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Discount
                </th>
                <th scope='col' className='py-3 px-4'>
                  Stock
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((data, index) => {
                return (
                  <tr key={index}>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      {data}
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <img
                        src={`http://localhost:5173/category/${data}.jpg`}
                        alt='product image'
                        className='w-[45px] h-[45px]'
                      />
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      Men Full Sleeve
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      T-shirt
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      Verido
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      $230
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      10%
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      20
                    </td>

                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <div className='flex justify-start items-center gap-4'>
                        <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                          <FaEdit />
                        </Link>
                        <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                          <FaEye />
                        </Link>
                        <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className='w-full flex justify-end mt-4 '>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
}
