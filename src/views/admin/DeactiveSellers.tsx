import { useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function DeactiveSellers() {
  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-lg font-bold mb-3'>Deactive Seller</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center'>
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            name=''
            id=''
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
          <input
            type='text'
            placeholder='Search...'
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6]'
          />
        </div>

        <div className='relative overflow-x-auto'>
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
                  Email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Status
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
                      Nicolas Leigh
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      nicolas@e.com
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <span>Pending</span>
                    </td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <span>Deactive</span>
                    </td>

                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                      <div className='flex justify-start items-center gap-4'>
                        <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
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
