import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryEdit, messageClear } from "@/store/reducers/categoryReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  initialState: {
    name: string;
    image: string;
    id: string;
  };
}

export default function EditCategory({ initialState, setVisible }: Props) {
  const [imageShow, setImageShow] = useState(initialState.image);
  const [category, setCategory] = useState({ name: "", image: null } as { name: string; image: File | null });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(category);
    dispatch(categoryEdit({ ...category, id: initialState.id }));
    setVisible(false);
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-full gap-3 mb-3'>
        <div>
          <Label htmlFor='name-edit'>Category Name</Label>
          <Input
            name='name-edit'
            value={category.name || initialState.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Category Image</Label>
          <Label
            htmlFor='image-edit'
            className='flex justify-center items-center flex-col h-72 cursor-pointer rounded-md border w-full '
          >
            <img src={imageShow} className='w-full h-full' />
          </Label>
          <Input
            onChange={(e) => {
              imageHandle(e);
              setCategory({ ...category, image: e.target.files && e.target.files[0] });
            }}
            type='file'
            name='image-edit'
            id='image-edit'
            className='hidden'
          />
        </div>
      </div>
      <Button>Update</Button>
    </form>
  );
}
