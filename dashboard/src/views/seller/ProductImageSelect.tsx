import { IoMdCloseCircle, IoMdImages } from "react-icons/io";

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
            className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'
          >
            <IoMdCloseCircle />
          </span>
        </div>
      ))}
      <label
        htmlFor='image'
        className='flex justify-center rounded-md items-center flex-col h-[180px] cursor-pointer border  hover:border-red-400 w-full text-muted-foreground'
      >
        <span>
          <IoMdImages />
        </span>
        <span>Select Image</span>
      </label>
      <input onChange={imageHandle} type='file' id='image' multiple className='hidden' />
    </div>
  );
}
