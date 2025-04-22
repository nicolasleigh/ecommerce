import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProduct } from "@/store/reducers/productReducer";
import { getShortObjectID } from "@/utils/utils";
import moment from "moment";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { messageClear } from "../../store/reducers/orderReducer";

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loader, successMessage, errorMessage } = useSelector((state) => state.product);
  // console.log(product);

  const getFinalPrice = () => {
    return product.price * (1 - product.discount / 100);
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 border rounded-md'>
        <div className='flex items-center justify-between gap-10 px-4'>
          <h2 className='text-xl  font-semibold'>Product Details</h2>
          <Button variant='link' onClick={() => navigate(-1)} className='p-0 underline hover:no-underline'>
            &larr; Go back
          </Button>
        </div>
        <div className='p-4 space-y-3'>
          <div className='flex items-center gap-4 '>
            <Label>Product ID: </Label>
            <span className='text-sm'>{getShortObjectID(product._id)}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Category: </Label>
            <Badge className='uppercase '>{product.category}</Badge>
          </div>
          <div className='flex items-center gap-4 '>
            <Label>Product Name: </Label>
            <span className='capitalize text-sm'>{product.name}</span>
          </div>

          <div className='flex items-center gap-4  '>
            <Label>Product Description: </Label>
            <span className='text-sm'>{product.description}</span>
          </div>

          <div className='flex items-center gap-4  '>
            <Label>Product Created At: </Label>
            <span className='text-sm'>{moment(product.createdAt).format("lll")}</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Product Updated At: </Label>
            <span className='text-sm'>{moment(product.updatedAt).format("lll")}</span>
          </div>

          <div className='flex items-center gap-4  '>
            <Label>Product Rating: </Label>
            {!product.rating ? (
              <span className='text-sm text-muted-foreground'>No rating yet</span>
            ) : (
              <span>{product.rating}</span>
            )}
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Original Price: </Label>
            <span className='text-sm'>{product.price} ¥</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Discount: </Label>
            <span className='text-sm'>{product.discount} %</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Final Price: </Label>
            <span className='text-sm'>{getFinalPrice()} ¥</span>
          </div>
          <div className='flex items-center gap-4  '>
            <Label>Stock: </Label>
            <span className='text-sm'>{product.stock}</span>
          </div>
          <div className='flex flex-col  gap-4  '>
            <Label>Product Images: </Label>
            <div className='flex flex-wrap gap-2 ml-5'>
              {product.images?.map((p, i) => (
                <div key={i} className='border p-1  rounded-md'>
                  <div className='flex gap-5 items-center'>
                    <img src={p} alt='produce image' className='w-36 h-36 ' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
