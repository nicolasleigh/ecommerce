import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

export default function Products({ title, products }) {
  // const products = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  // ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    // console.log(currentSlide);
    return (
      <div className='flex justify-between items-center'>
        <div className='text-xl font-bold text-slate-600'>{title}</div>
        <div className='flex justify-center items-center gap-3 text-slate-600'>
          <button
            onClick={() => previous()}
            className={cn(
              currentSlide === 0 ? "bg-slate-100 text-slate-300" : "bg-slate-200",
              "w-[30px] h-[30px] rounded-sm flex justify-center items-center  "
            )}
            disabled={currentSlide === 0}
          >
            <ChevronLeft strokeWidth={1.5} />
          </button>
          <button
            onClick={() => next()}
            className={cn(
              currentSlide === 2 ? "bg-slate-100 text-slate-300" : "bg-slate-200",
              "w-[30px] h-[30px] rounded-sm flex justify-center items-center "
            )}
          >
            <ChevronRight strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='flex gap-5 flex-col-reverse'>
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((slides, i) => {
          // console.log(slides);
          return (
            <div key={i} className=' flex flex-col justify-start  border rounded-sm'>
              {slides.map((product, j) => (
                <Link
                  to={`/product/details/${product.slug}`}
                  key={product.slug}
                  className='flex justify-start items-start border-b last:border-b-0 py-2 px-2'
                >
                  <img src={product.images[0]} alt='products' className='w-[110px] h-[110px] rounded-sm border ' />
                  <div className='px-3 flex justify-start items-start gap-1 flex-col text-slate-600'>
                    <h2 className='capitalize text-lg font-semibold'>{product.name}</h2>
                    <span className='font-semibold'>{product.price}¥</span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
