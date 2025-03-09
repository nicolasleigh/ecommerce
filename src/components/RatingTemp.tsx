import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingTemp({ rating }) {
  if (rating === 5) {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
      </>
    );
  } else if (rating === 4) {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 3) {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 2) {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
      </>
    );
  } else if (rating === 1) {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
        <span className='text-[#edbb0e]'>
          <FaRegStar />
        </span>
      </>
    );
  }
}
