import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ ratings }) {
  return (
    <>
      {ratings >= 1 ? (
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      ) : ratings >= 0.5 ? (
        <span className='text-[#059473]'>
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      )}
      {ratings >= 2 ? (
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      ) : ratings >= 1.5 ? (
        <span className='text-[#059473]'>
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      )}
      {ratings >= 3 ? (
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      ) : ratings >= 2.5 ? (
        <span className='text-[#059473]'>
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      )}
      {ratings >= 4 ? (
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      ) : ratings >= 3.5 ? (
        <span className='text-[#059473]'>
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className='text-[#059473]'>
          <FaRegStar />
        </span>
      )}
      {ratings >= 5 ? (
        <span className='text-[#059473]'>
          <FaStar />
        </span>
      ) : ratings >= 4.5 ? (
        <span className='text-[#059473]'>
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className='text-[#059473] '>
          <FaRegStar />
        </span>
      )}
    </>
  );
}
