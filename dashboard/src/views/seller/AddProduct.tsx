import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { getCategory } from "../../store/reducers/categoryReducer";
import { messageClear } from "../../store/reducers/productReducer";
import ProductImageSelect from "./ProductImageSelect";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  discount: z.string(),
  price: z.string(),
  brand: z.string(),
  stock: z.string(),
  category: z.string(),
  images: z.any(),
});

export default function AddProduct() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getCategory({
        searchValue: "",
        page: "",
        perPage: "",
      })
    );
  }, []);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");
  const [categorySelectedObj, setCategorySelectedObj] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      discount: "",
      price: "",
      brand: "",
      stock: "",
      category: "",
      images: "",
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      const srcValue = allCategory.filter((c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      form.setValue("images", [...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      const tempUrl = imageShow;
      const tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
      form.setValue("images", [...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    form.setValue("images", filterImage);
    setImageShow(filterImageUrl);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", state.name);
  //   formData.append("description", state.description);
  //   formData.append("discount", state.discount);
  //   formData.append("price", state.price);
  //   formData.append("brand", state.brand);
  //   formData.append("stock", state.stock);
  //   formData.append("shopName", "EasyShop");
  //   formData.append("category", category);
  //   for (let i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  //   dispatch(productAdd(formData));
  // };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  console.log(categories);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className='px-2 lg:px-7 pt-5 '>
      <div className='w-full p-4  rounded-md '>
        {/* <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
          <Link
            to='/seller/dashboard/products'
            className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'
          >
            All Product
          </Link>
        </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* first row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full '>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='brand'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Product Brand</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* second row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full '>
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className='capitalize'>
                          <SelectValue placeholder='Select Category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c, i) => (
                          <SelectItem key={i} value={c._id} className='capitalize'>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='stock'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Product Stock</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} max={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* third row */}
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                  <FormItem className='w-1/2'>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* fourth row */}
            <div className='mb-3 '>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='h-40 ' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mb-6 '>
              <FormField
                control={form.control}
                name='images'
                render={() => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <ProductImageSelect
                        imageShow={imageShow}
                        imageHandle={imageHandle}
                        removeImage={removeImage}
                        changeImage={changeImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex'>
              <button
                disabled={loader}
                className='bg-red-500 w-60 flex items-center justify-center hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
              >
                {loader ? <Loader className='animate-spin' /> : "Add Product"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
