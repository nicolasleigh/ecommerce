import { columns } from "@/components/tables/CategoryColumn";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { categoryAdd, getCategory, messageClear } from "../../store/reducers/categoryReducer";

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
        <Button onClick={() => setShow(true)} className='px-4 py-2 cursor-pointer rounded-sm text-sm'>
          Add
        </Button>
      </div>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-7/12'>
          <div className='w-full p-4 border rounded-md'>
            <div className='relative overflow-x-auto mt-4'>
              <DataTable
                columns={columns}
                data={categories}
                searchValue={searchValue}
                // setPerPage={setPerPage}
                setSearchValue={setSearchValue}
                initialPageSize={5}
              />
            </div>
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
                <div
                  onClick={() => setShow(false)}
                  className='block p-1 bg-primary rounded-full text-primary-foreground lg:hidden'
                >
                  <X width={18} height={18} />
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
                                className='flex justify-center items-center flex-col h-72 cursor-pointer rounded-md border w-full '
                              >
                                {imageShow ? (
                                  <img src={imageShow} className='w-full h-full' />
                                ) : (
                                  <span className='flex gap-2 items-center text-muted-foreground'>
                                    <Image width={18} height={18} />
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
                    <div className='mt-4'>
                      <Button
                        disabled={loader}
                        variant='outline'
                        className=' w-full flex items-center justify-center px-7 py-2 mb-3'
                      >
                        {loader ? <Loader className='animate-spin' /> : "Add Category"}
                      </Button>
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
