import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

export default function Category() {
  const { categories } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 760 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 760, min: 560 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 560, min: 420 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 420, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='w-[85%] mx-auto relative'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[35px]'>
          <h2>Top Category</h2>
          <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "smmobile", "xsmobile"]}
      >
        {categories.map((c, i) => (
          <Link to={`/products?category=${c.name}`} key={i} className='h-[185px] rounded-sm ml-1  block'>
            <div className='w-full h-full relative p-3'>
              <img className='h-full w-full rounded-sm' src={c.image} alt='products images' />
              <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                <span className='py-[2px] px-6 bg-[#3330305d] text-white uppercase rounded-sm'>{c.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
