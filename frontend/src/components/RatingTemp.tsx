import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingTemp({ rating }) {
  if (rating === 5) {
    return (
      <>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      </>
    );
  } else if (rating === 4) {
    return (
      <>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 3) {
    return (
      <>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 2) {
    return (
      <>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 1) {
    return (
      <>
        <span className='text-[#059473]'>
          <FaStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      </>
    );
  }
}
