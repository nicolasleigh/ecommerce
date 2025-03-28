import { useEffect, useState } from "react";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { categoryAdd, messageClear, getCategory } from "../../store/reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Search from "../components/Search";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/CategoryColumn";

const formSchema = z.object({
  name: z.string().nonempty(),
  image: z.any(),
});

export default function Category() {
  // const [perPage, setPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categories } = useSelector((state) => state.category);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  // const [state, setState] = useState({
  //   name: "",
  //   image: "",
  // });

  const imageHandle = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      // setState({
      //   ...state,
      //   image: files[0],
      // });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(categoryAdd(state));
  //   console.log(state);
  // };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    dispatch(categoryAdd(values));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      // setState({
      //   name: "",
      //   image: "",
      // });
      setImageShow("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      // perPage: parseInt(perPage),
      // page: parseInt(currentPage),
      perPage: "",
      page: "",
      searchValue,
    };
    dispatch(getCategory(obj));
  }, [searchValue]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='flex lg:hidden justify-between items-center mb-5 p-4 border rounded-md'>
        <h1 className='font-semibold text-lg'>Category</h1>
        <Button
          onClick={() => setShow(true)}
          className='bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm'
        >
          Add
        </Button>
      </div>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-7/12'>
          <div className='w-full p-4 border rounded-md'>
            {/* <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} /> */}

            <div className='relative overflow-x-auto mt-4'>
              <DataTable
                columns={columns}
                data={categories}
                searchValue={searchValue}
                // setPerPage={setPerPage}
                setSearchValue={setSearchValue}
              />
              {/* <table className='w-full text-sm text-left '>
                <thead className='text-sm  uppercase border-b border-slate-700'>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                          {index + 1}
                        </td>
                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                          <img src={data.image} alt='product image' className='w-[45px] h-[45px]' />
                        </td>
                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap capitalize'>
                          {data.name}
                        </td>

                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                          <div className='flex justify-start items-center gap-4'>
                            <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                              <FaEdit />
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
              </table> */}
            </div>

            {/* <div className='w-full flex justify-end mt-4 '>
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                perPage={perPage}
                showItem={3}
              />
            </div> */}
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 lg:relative backdrop-blur-3xl lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-10 top-0 transition-all duration-500`}
        >
          <div className='w-full pl-5'>
            <div className='border h-screen lg:h-auto px-3 py-2 lg:rounded-md '>
              <div className='flex justify-between items-center mb-4'>
                <h1 className=' font-semibold text-xl w-full text-center'>Add Category</h1>
                <div onClick={() => setShow(false)} className='block lg:hidden'>
                  <IoMdCloseCircle />
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className=''>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <label htmlFor='name'>Category Name</label>
                    <input
                      value={state.name}
                      onChange={(e) => setState({ ...state, name: e.target.value })}
                      type='text'
                      id='name'
                      name='category_name'
                      placeholder='Category Name'
                      className='px-4 py-2  outline-none bg-transparent border border-slate-700 rounded-md '
                    /> */}
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='image'
                      render={({ field }) => (
                        <FormItem className=''>
                          <FormLabel>Category Image</FormLabel>
                          <FormControl>
                            <>
                              <label
                                htmlFor='image'
                                className='flex justify-center items-center flex-col h-40  cursor-pointer rounded-md border   w-full '
                              >
                                {imageShow ? (
                                  <img src={imageShow} className='w-full h-full' />
                                ) : (
                                  <span className='flex gap-2 items-center text-muted-foreground'>
                                    <FaImage />
                                    Select Image
                                  </span>
                                )}
                              </label>
                              <input
                                onChange={(e) => {
                                  imageHandle(e);
                                  field.onChange(e.target.files && e.target.files[0]);
                                }}
                                type='file'
                                name='image'
                                id='image'
                                className='hidden'
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <label
                      htmlFor='image'
                      className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full '
                    >
                      {imageShow ? (
                        <img src={imageShow} className='w-full h-full' />
                      ) : (
                        <span>
                          <FaImage />
                        </span>
                      )}

                      <span>Select Image</span>
                    </label>
                    <input onChange={imageHandle} type='file' name='image' id='image' className='hidden' /> */}
                    <div className='mt-4'>
                      <button
                        disabled={loader}
                        className='bg-red-800 w-full hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
                      >
                        {loader ? <PropagateLoader color='white' cssOverride={overrideStyle} /> : "Add Category"}
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
