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
import { messageClear, productAdd } from "../../store/reducers/productReducer";
import ProductImageSelect from "./ProductImageSelect";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  description: z.string().nonempty("Description cannot be empty"),
  discount: z.string(),
  price: z.string().nonempty("Price cannot be empty"),
  brand: z.string().nonempty("Brand cannot be empty"),
  stock: z.string().nonempty("Stock cannot be empty"),
  category: z.string().nonempty("Category cannot be empty"),
  images: z.instanceof(File).array().nonempty("Please select at least one image file"),
});

export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
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
      images: [],
    },
  });

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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("discount", values.discount);
    formData.append("price", values.price);
    formData.append("brand", values.brand);
    formData.append("stock", values.stock);
    formData.append("shopName", "Petify");
    formData.append("category", values.category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(productAdd(formData));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      form.reset();
      setImageShow([]);
      setImages([]);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className='px-2 lg:px-7 pt-5 '>
      <div className='w-full p-4  rounded-md '>
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
                          <SelectItem key={i} value={c.name} className='capitalize'>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                      <Input {...field} type='number' min={0} />
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
                      <Input {...field} type='number' min={0} />
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
              <Button
                disabled={loader}
                className='w-64 flex items-center justify-center disabled:cursor-not-allowed px-7 py-2 mb-3'
              >
                {loader ? <Loader className='animate-spin' /> : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
