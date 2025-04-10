import { Images, X } from "lucide-react";

export default function ProductImageSelect({ imageShow, imageHandle, removeImage, changeImage }) {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full mt-5 mb-4'>
      {imageShow.map((image, i) => (
        <div key={i} className='h-[180px] relative'>
          <label htmlFor={i}>
            <img src={image.url} alt='image' className='w-full h-full rounded-sm' />
          </label>
          <input onChange={(e) => changeImage(e.target.files[0], i)} type='file' id={i} className='hidden' />
          <span
            onClick={() => removeImage(i)}
            className='p-1.5 z-10 cursor-pointer bg-primary text-primary-foreground absolute top-1 right-1 rounded-full'
          >
            <X width={18} strokeWidth={2.5} height={18} />
          </span>
        </div>
      ))}
      <label
        htmlFor='image'
        className='flex justify-center rounded-md items-center flex-col h-[180px] cursor-pointer border  hover:border-primary w-full text-muted-foreground'
      >
        <span>
          <Images width={18} />
        </span>
        <span>Select Image</span>
      </label>
      <input onChange={imageHandle} type='file' id='image' multiple className='hidden' />
    </div>
  );
}
